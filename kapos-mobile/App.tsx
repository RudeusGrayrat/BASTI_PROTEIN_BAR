import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  createPaymentIntent,
  createSale,
  failPaymentIntent,
  getAccessSummary,
  getBranches,
  getCashRegisters,
  getOpenCashSessions,
  getPaymentMethods,
  getProducts,
  loginMobile,
  logoutMobile,
  MobileApiError,
  openCashSession,
  confirmPaymentIntent,
  refreshMobile,
} from "./src/api";
import { palette, shadows } from "./src/theme";
import type {
  AuthUser,
  BranchSummary,
  CartItem,
  CashRegisterSummary,
  CashSessionSummary,
  ErpAccessSummary,
  MembershipAccessSummary,
  PaymentMethodSummary,
  ProductSummary,
} from "./src/types";
import { cartCount, cartTotal, currency, findIzipayMethod, greetingName, makeIzipayRef, productAvailableForBranch } from "./src/utils";

type ScreenTab = "dashboard" | "pos";

type SessionState = {
  apiBaseUrl: string;
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

const DEFAULT_API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000/api";

export default function App() {
  const [apiBaseUrl, setApiBaseUrl] = useState(DEFAULT_API_URL);
  const [identifier, setIdentifier] = useState("admin@kapos.local");
  const [password, setPassword] = useState("Admin123*");
  const [session, setSession] = useState<SessionState | null>(null);
  const [accessSummary, setAccessSummary] = useState<ErpAccessSummary | null>(null);
  const [activeMembership, setActiveMembership] = useState<MembershipAccessSummary | null>(null);
  const [branches, setBranches] = useState<BranchSummary[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodSummary[]>([]);
  const [registers, setRegisters] = useState<CashRegisterSummary[]>([]);
  const [openSessions, setOpenSessions] = useState<CashSessionSummary[]>([]);
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [productSearch, setProductSearch] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [selectedCashSessionId, setSelectedCashSessionId] = useState<string | null>(null);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string | null>(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState<"TICKET" | "BOLETA">("TICKET");
  const [tab, setTab] = useState<ScreenTab>("dashboard");
  const [isBusy, setIsBusy] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [openingSheetOpen, setOpeningSheetOpen] = useState(false);
  const [openingAmount, setOpeningAmount] = useState("0");
  const [openingRegisterId, setOpeningRegisterId] = useState<string | null>(null);
  const [saleNote, setSaleNote] = useState("");
  const [lastSaleMessage, setLastSaleMessage] = useState<string | null>(null);

  const activeOrganizationId = activeMembership?.organizationId ?? null;

  const activeBranch = useMemo(
    () => branches.find((branch) => branch.id === selectedBranchId) ?? null,
    [branches, selectedBranchId],
  );

  const activeCashSession = useMemo(
    () => openSessions.find((item) => item.id === selectedCashSessionId) ?? null,
    [openSessions, selectedCashSessionId],
  );

  const availableProducts = useMemo(() => {
    const search = productSearch.trim().toLowerCase();
    return products
      .filter((product) => productAvailableForBranch(product, selectedBranchId))
      .filter((product) => {
        if (!search) return true;
        return [product.name, product.sku, product.description, product.category?.name]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(search));
      });
  }, [products, productSearch, selectedBranchId]);

  const totalAmount = useMemo(() => cartTotal(cartItems), [cartItems]);
  const totalItems = useMemo(() => cartCount(cartItems), [cartItems]);
  const izipayMethod = useMemo(() => findIzipayMethod(paymentMethods), [paymentMethods]);

  useEffect(() => {
    if (!activeMembership && accessSummary?.memberships?.length) {
      const nextMembership =
        accessSummary.memberships.find((membership) => membership.membershipStatus === "ACTIVE") ??
        accessSummary.memberships[0] ??
        null;
      setActiveMembership(nextMembership);
    }
  }, [accessSummary, activeMembership]);

  useEffect(() => {
    if (!selectedPaymentMethodId && paymentMethods.length) {
      setSelectedPaymentMethodId(izipayMethod?.id ?? paymentMethods.find((method) => method.enabled)?.id ?? null);
    }
  }, [izipayMethod, paymentMethods, selectedPaymentMethodId]);

  async function withFreshToken<T>(operation: (accessToken: string) => Promise<T>) {
    if (!session) {
      throw new Error("No hay sesion activa.");
    }

    try {
      return await operation(session.accessToken);
    } catch (requestError) {
      if (!(requestError instanceof MobileApiError) || requestError.status !== 401) {
        throw requestError;
      }

      const refreshed = await refreshMobile(session.apiBaseUrl, session.refreshToken);
      const nextSession = {
        apiBaseUrl: session.apiBaseUrl,
        accessToken: refreshed.accessToken,
        refreshToken: refreshed.refreshToken,
        user: refreshed.user,
      };
      setSession(nextSession);
      return operation(nextSession.accessToken);
    }
  }

  async function hydrateOrganizationData(nextMembership: MembershipAccessSummary, accessToken: string) {
    const [branchRows, methodRows, registerRows, sessionRows, productRows] = await Promise.all([
      getBranches(apiBaseUrl, accessToken, nextMembership.organizationId),
      getPaymentMethods(apiBaseUrl, accessToken, nextMembership.organizationId),
      getCashRegisters(apiBaseUrl, accessToken, nextMembership.organizationId),
      getOpenCashSessions(apiBaseUrl, accessToken, nextMembership.organizationId),
      getProducts(apiBaseUrl, accessToken, nextMembership.organizationId),
    ]);

    setBranches(branchRows.filter((branch) => branch.status === "ACTIVE"));
    setPaymentMethods(methodRows.filter((method) => method.enabled));
    setRegisters(registerRows.filter((register) => register.status === "ACTIVE"));
    setOpenSessions(sessionRows.data);
    setProducts(productRows.data);

    const nextBranchId =
      branchRows.find((branch) => sessionRows.data.some((item) => item.branchId === branch.id))?.id ??
      nextMembership.branchIds[0] ??
      branchRows[0]?.id ??
      null;

    setSelectedBranchId(nextBranchId);

    const nextOpenSession =
      sessionRows.data.find((item) => item.branchId === nextBranchId) ?? sessionRows.data[0] ?? null;

    setSelectedCashSessionId(nextOpenSession?.id ?? null);
    setOpeningRegisterId(registerRows.find((register) => register.branchId === nextBranchId)?.id ?? null);
  }

  async function handleLogin() {
    setIsBusy(true);
    setError(null);
    setLastSaleMessage(null);

    try {
      const auth = await loginMobile(apiBaseUrl, { identifier, password });
      const nextSession: SessionState = {
        apiBaseUrl,
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
        user: auth.user,
      };
      const summary = await getAccessSummary(apiBaseUrl, auth.accessToken);
      const membership =
        summary.memberships.find((item) => item.membershipStatus === "ACTIVE") ??
        summary.memberships[0] ??
        null;

      if (!membership) {
        throw new Error("Tu usuario no tiene una organizacion activa para operar.");
      }

      setSession(nextSession);
      setAccessSummary(summary);
      setActiveMembership(membership);
      await hydrateOrganizationData(membership, auth.accessToken);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "No se pudo iniciar sesion.");
    } finally {
      setIsBusy(false);
    }
  }

  async function handleRefreshOrganizationData() {
    if (!activeMembership) return;
    setIsRefreshing(true);
    setError(null);

    try {
      await withFreshToken(async (token) => {
        const summary = await getAccessSummary(apiBaseUrl, token);
        setAccessSummary(summary);
        await hydrateOrganizationData(activeMembership, token);
      });
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : "No se pudo refrescar la data.");
    } finally {
      setIsRefreshing(false);
    }
  }

  async function handleLogout() {
    if (!session) return;
    try {
      await logoutMobile(session.apiBaseUrl, session.refreshToken);
    } catch {
      // ignore logout errors and close local session anyway
    } finally {
      setSession(null);
      setAccessSummary(null);
      setActiveMembership(null);
      setBranches([]);
      setPaymentMethods([]);
      setRegisters([]);
      setOpenSessions([]);
      setProducts([]);
      setCartItems([]);
      setSelectedBranchId(null);
      setSelectedCashSessionId(null);
      setSelectedPaymentMethodId(null);
      setError(null);
      setLastSaleMessage(null);
    }
  }

  async function handleChangeMembership(membership: MembershipAccessSummary) {
    setActiveMembership(membership);
    setCartItems([]);
    setError(null);

    try {
      await withFreshToken((token) => hydrateOrganizationData(membership, token));
    } catch (membershipError) {
      setError(membershipError instanceof Error ? membershipError.message : "No se pudo cambiar de organizacion.");
    }
  }

  function addProduct(product: ProductSummary) {
    setCartItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
    setLastSaleMessage(null);
  }

  function changeQuantity(productId: string, delta: number) {
    setCartItems((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function clearCart() {
    setCartItems([]);
    setSaleNote("");
    setCheckoutOpen(false);
  }

  async function handleOpenCashSession() {
    if (!activeOrganizationId || !selectedBranchId || !openingRegisterId) {
      setError("Selecciona sucursal y caja antes de abrir el turno.");
      return;
    }

    setIsBusy(true);
    setError(null);

    try {
      await withFreshToken(async (token) => {
        await openCashSession(apiBaseUrl, token, activeOrganizationId, {
          branchId: selectedBranchId,
          cashRegisterId: openingRegisterId,
          openingAmount: Number(openingAmount || "0"),
          openingNote: "Apertura desde Kapos Mobile",
        });
        await hydrateOrganizationData(activeMembership!, token);
      });
      setOpeningSheetOpen(false);
    } catch (openingError) {
      setError(openingError instanceof Error ? openingError.message : "No se pudo abrir la caja.");
    } finally {
      setIsBusy(false);
    }
  }

  async function handleCheckout() {
    if (!session || !activeOrganizationId || !selectedBranchId || !selectedCashSessionId) {
      setError("Debes iniciar sesion, elegir sucursal y tener una caja abierta.");
      return;
    }

    if (!cartItems.length) {
      setError("Agrega productos al carrito antes de cobrar.");
      return;
    }

    const selectedMethod = paymentMethods.find((method) => method.id === selectedPaymentMethodId) ?? null;
    if (!selectedMethod) {
      setError("Selecciona un metodo de pago.");
      return;
    }

    setIsBusy(true);
    setError(null);

    try {
      await withFreshToken(async (token) => {
        let paymentIntentId: string | undefined;
        let providerRef: string | undefined;
        let provider: string | undefined;

        if (
          selectedMethod.type === "CARD" ||
          selectedMethod.code.toLowerCase().includes("izipay") ||
          selectedMethod.name.toLowerCase().includes("izipay")
        ) {
          provider = "IZIPAY";
          providerRef = makeIzipayRef();
          const intent = await createPaymentIntent(apiBaseUrl, token, activeOrganizationId, {
            amount: totalAmount,
            provider,
            branchId: selectedBranchId,
            cashSessionId: selectedCashSessionId,
            paymentMethodId: selectedMethod.id,
            providerRef,
            rawRequest: {
              source: "kapos-mobile",
              mode: "ui-ready",
              note: "Intento preparado para integracion Izipay real",
            },
          });
          paymentIntentId = intent.id;

          try {
            await confirmPaymentIntent(apiBaseUrl, token, activeOrganizationId, intent.id, {
              providerRef,
              rawResponse: {
                approved: true,
                provider: "IZIPAY",
                simulated: true,
              },
            });
          } catch (intentError) {
            await failPaymentIntent(apiBaseUrl, token, activeOrganizationId, intent.id, {
              providerRef,
              rawResponse: { approved: false, simulated: true },
            }).catch(() => undefined);
            throw intentError;
          }
        }

        const sale = await createSale(apiBaseUrl, token, activeOrganizationId, {
          branchId: selectedBranchId,
          cashSessionId: selectedCashSessionId,
          channel: "MOBILE_POS",
          billingDocumentType: selectedDocumentType,
          note: saleNote || "Venta registrada desde Kapos Mobile",
          items: cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
          payments: [
            {
              paymentMethodId: selectedMethod.id,
              paymentIntentId,
              amount: totalAmount,
              status: "CONFIRMED",
              provider,
              providerRef,
            },
          ],
        });

        setLastSaleMessage(`Venta ${sale.saleNumber} registrada por ${currency(sale.total)}.`);
        clearCart();
        await hydrateOrganizationData(activeMembership!, token);
      });
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "No se pudo crear la venta.");
    } finally {
      setIsBusy(false);
    }
  }

  if (!session || !activeMembership) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={styles.authLayout}>
          <View style={styles.brandHero}>
            <View style={styles.brandOrb}>
              <Text style={styles.brandOrbLetter}>K</Text>
            </View>
            <Text style={styles.brandEyebrow}>KAPOS MOBILE POS</Text>
            <Text style={styles.brandTitle}>Checkout móvil con estilo Kapos e intención lista para Izipay</Text>
            <Text style={styles.brandDescription}>
              Adaptamos la estética del ERP web a una interfaz móvil enfocada en caja, catálogo y ventas rápidas.
            </Text>
          </View>

          <View style={styles.authCard}>
            <Text style={styles.sectionEyebrow}>Conexión</Text>
            <Text style={styles.sectionTitle}>Ingresa y apunta al backend</Text>
            <Field label="API base">
              <TextInput
                value={apiBaseUrl}
                onChangeText={setApiBaseUrl}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="http://tu-ip:3000/api"
                placeholderTextColor={palette.textMuted}
                style={styles.input}
              />
            </Field>
            <Field label="Usuario ERP">
              <TextInput
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
                placeholder="admin@kapos.local"
                placeholderTextColor={palette.textMuted}
                style={styles.input}
              />
            </Field>
            <Field label="Contraseña">
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Tu contraseña"
                placeholderTextColor={palette.textMuted}
                style={styles.input}
              />
            </Field>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Pressable style={[styles.primaryButton, isBusy && styles.buttonDisabled]} onPress={handleLogin} disabled={isBusy}>
              {isBusy ? <ActivityIndicator color={palette.black} /> : <Text style={styles.primaryButtonText}>Entrar a Kapos Mobile</Text>}
            </Pressable>
            <Text style={styles.helperText}>
              Usa `EXPO_PUBLIC_API_URL` para precargar la URL del backend. Si pruebas en dispositivo físico, cambia `localhost` por la IP de tu máquina.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.appShell}>
        <ScrollView contentContainerStyle={styles.contentLayout}>
          <View style={styles.topHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>Operación activa</Text>
              <Text style={styles.headerTitle}>Hola, {greetingName(session.user)}</Text>
              <Text style={styles.headerSubtitle}>
                {activeMembership.organizationName} · {activeBranch?.name ?? "sin sucursal"} · {activeCashSession ? "caja abierta" : "falta apertura"}
              </Text>
            </View>
            <Pressable style={styles.ghostButton} onPress={handleLogout}>
              <Text style={styles.ghostButtonText}>Salir</Text>
            </Pressable>
          </View>

          <View style={styles.organizationRail}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.organizationRailInner}>
                {accessSummary?.memberships.map((membership) => (
                  <Pressable
                    key={membership.membershipId}
                    style={[
                      styles.orgChip,
                      activeMembership.organizationId === membership.organizationId && styles.orgChipActive,
                    ]}
                    onPress={() => void handleChangeMembership(membership)}
                  >
                    <Text
                      style={[
                        styles.orgChipTitle,
                        activeMembership.organizationId === membership.organizationId && styles.orgChipTitleActive,
                      ]}
                    >
                      {membership.organizationName}
                    </Text>
                    <Text style={styles.orgChipMeta}>{membership.roleKeys.join(", ") || membership.membershipStatus}</Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.heroGrid}>
            <MetricCard label="Ventas potenciales" value={currency(totalAmount)} helper={`${totalItems} item(s) listos`} emphasis="dark" />
            <MetricCard label="Productos POS" value={String(availableProducts.length)} helper="Activos y visibles" emphasis="lime" />
            <MetricCard label="Métodos activos" value={String(paymentMethods.length)} helper={izipayMethod ? "Izipay preparado" : "Configura tarjeta/Izipay"} />
          </View>

          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <View>
                <Text style={styles.panelTitle}>Contexto operativo</Text>
                <Text style={styles.panelSubtitle}>Sucursal, caja, catálogo y POS del backend central.</Text>
              </View>
              <Pressable style={styles.softButton} onPress={() => void handleRefreshOrganizationData()}>
                <Text style={styles.softButtonText}>{isRefreshing ? "Actualizando..." : "Refrescar"}</Text>
              </Pressable>
            </View>

            <View style={styles.contextGrid}>
              <SelectorBlock
                title="Sucursal"
                options={branches.map((branch) => ({ id: branch.id, label: branch.name }))}
                value={selectedBranchId}
                onSelect={setSelectedBranchId}
              />
              <SelectorBlock
                title="Caja abierta"
                options={openSessions
                  .filter((item) => !selectedBranchId || item.branchId === selectedBranchId)
                  .map((item) => ({
                    id: item.id,
                    label: item.cashRegister?.name ?? item.id,
                    meta: currency(item.openingAmount),
                  }))}
                value={selectedCashSessionId}
                onSelect={setSelectedCashSessionId}
              />
              <View style={styles.infoBlock}>
                <Text style={styles.infoBlockTitle}>Apertura</Text>
                <Text style={styles.infoBlockValue}>
                  {activeCashSession ? `Abierta ${currency(activeCashSession.openingAmount)}` : "Sin sesión abierta"}
                </Text>
                <Pressable style={styles.primaryMiniButton} onPress={() => setOpeningSheetOpen(true)}>
                  <Text style={styles.primaryMiniButtonText}>Abrir caja</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {error ? <Text style={styles.errorBanner}>{error}</Text> : null}
          {lastSaleMessage ? <Text style={styles.successBanner}>{lastSaleMessage}</Text> : null}

          {tab === "dashboard" ? (
            <View style={styles.dashboardGrid}>
              <Panel title="Pulso comercial" subtitle="Resumen visual alineado a la estética Kapos web.">
                <View style={styles.chartArea}>
                  <Text style={styles.chartHeadline}>{currency(totalAmount + 128.4)}</Text>
                  <Text style={styles.chartMeta}>Meta simulada del turno activo</Text>
                  <View style={styles.waveRow}>
                    {[28, 44, 32, 58, 40, 60, 54].map((height, index) => (
                      <View key={index} style={[styles.wavePoint, { height }]} />
                    ))}
                  </View>
                </View>
              </Panel>
              <Panel title="Top productos" subtitle="Lo que hoy ya podrías vender desde mobile.">
                {availableProducts.slice(0, 5).map((product) => (
                  <View key={product.id} style={styles.listRow}>
                    <View style={styles.listBullet}><Text style={styles.listBulletText}>{product.name.charAt(0)}</Text></View>
                    <View style={styles.listBody}>
                      <Text style={styles.listTitle}>{product.name}</Text>
                      <Text style={styles.listMeta}>{product.category?.name ?? "Sin categoría"}</Text>
                    </View>
                    <Text style={styles.listValue}>{currency(product.price)}</Text>
                  </View>
                ))}
              </Panel>
              <Panel title="Pago Izipay" subtitle="Checkout preparado con payment intents del backend.">
                <Text style={styles.detailLine}>Método detectado: {izipayMethod?.name ?? "Aún no configurado"}</Text>
                <Text style={styles.detailLine}>Proveedor: {izipayMethod ? "IZIPAY" : "Pendiente"}</Text>
                <Text style={styles.detailLine}>Modo actual: confirmación desde app mientras se expone el bridge/SDK real.</Text>
              </Panel>
            </View>
          ) : (
            <View style={styles.posLayout}>
              <View style={styles.panel}>
                <View style={styles.panelHeader}>
                  <View>
                    <Text style={styles.panelTitle}>Catálogo POS</Text>
                    <Text style={styles.panelSubtitle}>Productos activos y disponibles para la sucursal elegida.</Text>
                  </View>
                  <TextInput
                    value={productSearch}
                    onChangeText={setProductSearch}
                    placeholder="Buscar producto..."
                    placeholderTextColor={palette.textMuted}
                    style={styles.searchInput}
                  />
                </View>
                <View style={styles.productGrid}>
                  {availableProducts.map((product) => (
                    <Pressable key={product.id} style={styles.productCard} onPress={() => addProduct(product)}>
                      <View style={styles.productIcon}>
                        <Text style={styles.productIconText}>{product.name.charAt(0)}</Text>
                      </View>
                      <Text style={styles.productTitle}>{product.name}</Text>
                      <Text style={styles.productMeta}>{product.sku ?? product.category?.name ?? "Disponible"}</Text>
                      <Text style={styles.productPrice}>{currency(product.price)}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View style={styles.cartPanel}>
                <View style={styles.panelHeader}>
                  <View>
                    <Text style={styles.panelTitle}>Carrito</Text>
                    <Text style={styles.panelSubtitle}>Lista de cobro rápida para punto de venta.</Text>
                  </View>
                  <Pressable style={styles.softButton} onPress={clearCart}>
                    <Text style={styles.softButtonText}>Vaciar</Text>
                  </Pressable>
                </View>

                {cartItems.length === 0 ? (
                  <Text style={styles.emptyStateText}>Todavía no agregas productos al carrito.</Text>
                ) : (
                  cartItems.map((item) => (
                    <View key={item.product.id} style={styles.cartRow}>
                      <View style={styles.cartBody}>
                        <Text style={styles.cartTitle}>{item.product.name}</Text>
                        <Text style={styles.cartMeta}>{currency(item.product.price)} x {item.quantity}</Text>
                      </View>
                      <View style={styles.quantityControls}>
                        <Pressable style={styles.quantityButton} onPress={() => changeQuantity(item.product.id, -1)}>
                          <Text style={styles.quantityButtonText}>-</Text>
                        </Pressable>
                        <Text style={styles.quantityValue}>{item.quantity}</Text>
                        <Pressable style={styles.quantityButton} onPress={() => changeQuantity(item.product.id, 1)}>
                          <Text style={styles.quantityButtonText}>+</Text>
                        </Pressable>
                      </View>
                    </View>
                  ))
                )}

                <View style={styles.checkoutSummary}>
                  <View>
                    <Text style={styles.checkoutLabel}>Total actual</Text>
                    <Text style={styles.checkoutValue}>{currency(totalAmount)}</Text>
                  </View>
                  <Pressable
                    style={[styles.primaryButton, (!cartItems.length || !activeCashSession || isBusy) && styles.buttonDisabled]}
                    onPress={() => setCheckoutOpen(true)}
                    disabled={!cartItems.length || !activeCashSession || isBusy}
                  >
                    <Text style={styles.primaryButtonText}>Cobrar ahora</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.bottomNav}>
          <TabButton label="Dashboard" active={tab === "dashboard"} onPress={() => setTab("dashboard")} />
          <TabButton label="POS" active={tab === "pos"} onPress={() => setTab("pos")} />
        </View>
      </View>

      <Modal visible={checkoutOpen} animationType="slide" transparent onRequestClose={() => setCheckoutOpen(false)}>
        <View style={styles.modalScrim}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Cobro final</Text>
            <Text style={styles.modalSubtitle}>Flujo móvil preparado para ventas con Izipay y otros métodos.</Text>
            <SelectorBlock
              title="Método de pago"
              options={paymentMethods.map((method) => ({
                id: method.id,
                label: method.name,
                meta: method.type,
              }))}
              value={selectedPaymentMethodId}
              onSelect={setSelectedPaymentMethodId}
            />
            <View style={styles.modalRow}>
              <Text style={styles.modalMeta}>Comprobante</Text>
              <View style={styles.segmentedRow}>
                {(["TICKET", "BOLETA"] as const).map((item) => (
                  <Pressable
                    key={item}
                    style={[styles.segmentedButton, selectedDocumentType === item && styles.segmentedButtonActive]}
                    onPress={() => setSelectedDocumentType(item)}
                  >
                    <Text style={[styles.segmentedButtonText, selectedDocumentType === item && styles.segmentedButtonTextActive]}>{item}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <Field label="Nota">
              <TextInput
                value={saleNote}
                onChangeText={setSaleNote}
                placeholder="Observación de la venta"
                placeholderTextColor={palette.textMuted}
                style={[styles.input, styles.multilineInput]}
                multiline
              />
            </Field>
            <View style={styles.checkoutFooter}>
              <View>
                <Text style={styles.checkoutLabel}>Total a cobrar</Text>
                <Text style={styles.checkoutValue}>{currency(totalAmount)}</Text>
              </View>
              <View style={styles.checkoutActionRow}>
                <Pressable style={styles.softButton} onPress={() => setCheckoutOpen(false)}>
                  <Text style={styles.softButtonText}>Cancelar</Text>
                </Pressable>
                <Pressable style={[styles.primaryButton, isBusy && styles.buttonDisabled]} onPress={() => void handleCheckout()} disabled={isBusy}>
                  {isBusy ? <ActivityIndicator color={palette.black} /> : <Text style={styles.primaryButtonText}>Confirmar venta</Text>}
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={openingSheetOpen} animationType="slide" transparent onRequestClose={() => setOpeningSheetOpen(false)}>
        <View style={styles.modalScrim}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Abrir caja</Text>
            <Text style={styles.modalSubtitle}>Turno inicial para la sucursal activa desde Kapos Mobile.</Text>
            <SelectorBlock
              title="Caja"
              options={registers
                .filter((register) => !selectedBranchId || register.branchId === selectedBranchId)
                .map((register) => ({ id: register.id, label: register.name, meta: register.code }))}
              value={openingRegisterId}
              onSelect={setOpeningRegisterId}
            />
            <Field label="Monto inicial">
              <TextInput
                value={openingAmount}
                onChangeText={setOpeningAmount}
                keyboardType="decimal-pad"
                placeholder="0.00"
                placeholderTextColor={palette.textMuted}
                style={styles.input}
              />
            </Field>
            <View style={styles.checkoutActionRow}>
              <Pressable style={styles.softButton} onPress={() => setOpeningSheetOpen(false)}>
                <Text style={styles.softButtonText}>Cerrar</Text>
              </Pressable>
              <Pressable style={[styles.primaryButton, isBusy && styles.buttonDisabled]} onPress={() => void handleOpenCashSession()} disabled={isBusy}>
                {isBusy ? <ActivityIndicator color={palette.black} /> : <Text style={styles.primaryButtonText}>Abrir sesión</Text>}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{title}</Text>
      <Text style={styles.panelSubtitle}>{subtitle}</Text>
      <View style={styles.panelBody}>{children}</View>
    </View>
  );
}

function MetricCard({
  label,
  value,
  helper,
  emphasis = "light",
}: {
  label: string;
  value: string;
  helper: string;
  emphasis?: "light" | "dark" | "lime";
}) {
  return (
    <View
      style={[
        styles.metricCard,
        emphasis === "dark" && styles.metricCardDark,
        emphasis === "lime" && styles.metricCardLime,
      ]}
    >
      <Text style={[styles.metricLabel, emphasis === "dark" && styles.metricTextDark]}>{label}</Text>
      <Text style={[styles.metricValue, emphasis === "dark" && styles.metricTextDark]}>{value}</Text>
      <Text style={[styles.metricHelper, emphasis === "dark" && styles.metricHelperDark]}>{helper}</Text>
    </View>
  );
}

function TabButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable style={[styles.tabButton, active && styles.tabButtonActive]} onPress={onPress}>
      <Text style={[styles.tabButtonText, active && styles.tabButtonTextActive]}>{label}</Text>
    </Pressable>
  );
}

function SelectorBlock({
  title,
  options,
  value,
  onSelect,
}: {
  title: string;
  options: Array<{ id: string; label: string; meta?: string }>;
  value: string | null;
  onSelect: (value: string) => void;
}) {
  if (!options.length) {
    return (
      <View style={styles.selectorBlock}>
        <Text style={styles.infoBlockTitle}>{title}</Text>
        <Text style={styles.emptyStateText}>Sin opciones disponibles.</Text>
      </View>
    );
  }

  return (
    <View style={styles.selectorBlock}>
      <Text style={styles.infoBlockTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.selectorRow}>
          {options.map((option) => (
            <Pressable
              key={option.id}
              style={[styles.selectorChip, value === option.id && styles.selectorChipActive]}
              onPress={() => onSelect(option.id)}
            >
              <Text style={[styles.selectorChipTitle, value === option.id && styles.selectorChipTitleActive]}>{option.label}</Text>
              {option.meta ? <Text style={styles.selectorChipMeta}>{option.meta}</Text> : null}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  authLayout: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
    gap: 20,
  },
  brandHero: {
    backgroundColor: palette.card,
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: palette.border,
    ...shadows.card,
  },
  brandOrb: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.black,
    marginBottom: 18,
  },
  brandOrbLetter: {
    color: palette.lime,
    fontSize: 34,
    fontWeight: "900",
  },
  brandEyebrow: {
    color: palette.success,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 12,
  },
  brandTitle: {
    color: palette.text,
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
    marginBottom: 10,
  },
  brandDescription: {
    color: palette.textSoft,
    fontSize: 15,
    lineHeight: 23,
  },
  authCard: {
    backgroundColor: palette.card,
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: palette.border,
    ...shadows.card,
  },
  sectionEyebrow: {
    color: palette.success,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: palette.text,
    marginTop: 8,
    marginBottom: 18,
  },
  field: {
    marginBottom: 14,
  },
  fieldLabel: {
    color: palette.textSoft,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    backgroundColor: palette.cardAlt,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: palette.text,
    fontSize: 15,
  },
  multilineInput: {
    minHeight: 96,
    textAlignVertical: "top",
  },
  primaryButton: {
    backgroundColor: palette.lime,
    borderRadius: 18,
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  primaryButtonText: {
    color: palette.black,
    fontSize: 15,
    fontWeight: "800",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  helperText: {
    color: palette.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
  },
  appShell: {
    flex: 1,
  },
  contentLayout: {
    padding: 18,
    paddingBottom: 120,
    gap: 18,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },
  headerTitle: {
    color: palette.text,
    fontSize: 28,
    fontWeight: "800",
    marginTop: 8,
  },
  headerSubtitle: {
    color: palette.textSoft,
    fontSize: 14,
    marginTop: 6,
  },
  ghostButton: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.borderStrong,
    paddingHorizontal: 14,
    paddingVertical: 11,
    backgroundColor: palette.card,
  },
  ghostButtonText: {
    color: palette.text,
    fontWeight: "700",
  },
  organizationRail: {
    marginTop: 4,
  },
  organizationRailInner: {
    flexDirection: "row",
    gap: 10,
  },
  orgChip: {
    minWidth: 180,
    padding: 16,
    backgroundColor: palette.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: palette.border,
    ...shadows.soft,
  },
  orgChipActive: {
    backgroundColor: palette.black,
  },
  orgChipTitle: {
    color: palette.text,
    fontSize: 15,
    fontWeight: "800",
  },
  orgChipTitleActive: {
    color: palette.card,
  },
  orgChipMeta: {
    color: palette.textMuted,
    fontSize: 12,
    marginTop: 6,
  },
  heroGrid: {
    gap: 12,
  },
  metricCard: {
    backgroundColor: palette.card,
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: palette.border,
    ...shadows.card,
  },
  metricCardDark: {
    backgroundColor: palette.charcoal,
    borderColor: palette.charcoal,
  },
  metricCardLime: {
    backgroundColor: palette.limeWash,
    borderColor: palette.lime,
  },
  metricLabel: {
    color: palette.textSoft,
    fontSize: 14,
  },
  metricValue: {
    color: palette.text,
    fontSize: 32,
    fontWeight: "800",
    marginTop: 12,
  },
  metricHelper: {
    color: palette.textMuted,
    fontSize: 13,
    marginTop: 10,
  },
  metricTextDark: {
    color: palette.card,
  },
  metricHelperDark: {
    color: "#c1c7b5",
  },
  panel: {
    backgroundColor: palette.card,
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: palette.border,
    ...shadows.card,
  },
  panelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
  },
  panelTitle: {
    color: palette.text,
    fontSize: 22,
    fontWeight: "800",
  },
  panelSubtitle: {
    color: palette.textSoft,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
  panelBody: {
    marginTop: 18,
  },
  softButton: {
    backgroundColor: palette.cardAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  softButtonText: {
    color: palette.text,
    fontSize: 13,
    fontWeight: "700",
  },
  contextGrid: {
    gap: 12,
    marginTop: 18,
  },
  selectorBlock: {
    backgroundColor: palette.cardAlt,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.border,
  },
  infoBlock: {
    backgroundColor: palette.cardAlt,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.border,
  },
  infoBlockTitle: {
    color: palette.textSoft,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10,
  },
  infoBlockValue: {
    color: palette.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  primaryMiniButton: {
    alignSelf: "flex-start",
    backgroundColor: palette.limeWash,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: palette.lime,
  },
  primaryMiniButtonText: {
    color: palette.text,
    fontWeight: "800",
    fontSize: 12,
  },
  selectorRow: {
    flexDirection: "row",
    gap: 10,
  },
  selectorChip: {
    minWidth: 144,
    backgroundColor: palette.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  selectorChipActive: {
    backgroundColor: palette.black,
    borderColor: palette.black,
  },
  selectorChipTitle: {
    color: palette.text,
    fontWeight: "700",
  },
  selectorChipTitleActive: {
    color: palette.card,
  },
  selectorChipMeta: {
    color: palette.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  errorText: {
    color: palette.danger,
    marginBottom: 10,
    fontWeight: "600",
  },
  errorBanner: {
    backgroundColor: "#fff0ed",
    color: palette.danger,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ffd8cf",
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontWeight: "700",
  },
  successBanner: {
    backgroundColor: palette.limeWash,
    color: palette.text,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.lime,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontWeight: "700",
  },
  dashboardGrid: {
    gap: 12,
  },
  chartArea: {
    backgroundColor: palette.limeWash,
    borderRadius: 24,
    padding: 20,
  },
  chartHeadline: {
    fontSize: 30,
    fontWeight: "800",
    color: palette.text,
  },
  chartMeta: {
    color: palette.textSoft,
    marginTop: 6,
  },
  waveRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    marginTop: 18,
    height: 72,
  },
  wavePoint: {
    flex: 1,
    borderRadius: 999,
    backgroundColor: palette.lime,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  listBullet: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: palette.cardAlt,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: "center",
    justifyContent: "center",
  },
  listBulletText: {
    color: palette.success,
    fontWeight: "800",
  },
  listBody: {
    flex: 1,
  },
  listTitle: {
    color: palette.text,
    fontWeight: "700",
  },
  listMeta: {
    color: palette.textMuted,
    marginTop: 3,
    fontSize: 12,
  },
  listValue: {
    color: palette.text,
    fontWeight: "800",
  },
  detailLine: {
    color: palette.textSoft,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },
  posLayout: {
    gap: 12,
  },
  searchInput: {
    minWidth: 150,
    backgroundColor: palette.cardAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 14,
    paddingVertical: 11,
    color: palette.text,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 18,
  },
  productCard: {
    width: "47%",
    backgroundColor: palette.cardAlt,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.border,
  },
  productIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: palette.black,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  productIconText: {
    color: palette.lime,
    fontWeight: "800",
    fontSize: 18,
  },
  productTitle: {
    color: palette.text,
    fontWeight: "800",
    fontSize: 15,
  },
  productMeta: {
    color: palette.textMuted,
    fontSize: 12,
    marginTop: 5,
    minHeight: 32,
  },
  productPrice: {
    color: palette.text,
    fontWeight: "800",
    fontSize: 16,
    marginTop: 12,
  },
  cartPanel: {
    backgroundColor: palette.card,
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: palette.border,
    ...shadows.card,
  },
  emptyStateText: {
    color: palette.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  cartRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  cartBody: {
    flex: 1,
  },
  cartTitle: {
    color: palette.text,
    fontWeight: "700",
  },
  cartMeta: {
    color: palette.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quantityButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: palette.cardAlt,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    color: palette.text,
    fontWeight: "900",
    fontSize: 18,
  },
  quantityValue: {
    color: palette.text,
    fontWeight: "800",
    minWidth: 18,
    textAlign: "center",
  },
  checkoutSummary: {
    marginTop: 18,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  checkoutLabel: {
    color: palette.textMuted,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.3,
  },
  checkoutValue: {
    color: palette.text,
    fontWeight: "800",
    fontSize: 24,
    marginTop: 6,
  },
  bottomNav: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18,
    backgroundColor: palette.black,
    borderRadius: 26,
    padding: 8,
    flexDirection: "row",
    gap: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    minHeight: 50,
  },
  tabButtonActive: {
    backgroundColor: palette.lime,
  },
  tabButtonText: {
    color: "#dce2d0",
    fontWeight: "800",
  },
  tabButtonTextActive: {
    color: palette.black,
  },
  modalScrim: {
    flex: 1,
    backgroundColor: "rgba(12,13,15,0.35)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: palette.card,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 22,
    paddingBottom: 28,
    borderWidth: 1,
    borderColor: palette.border,
  },
  modalTitle: {
    color: palette.text,
    fontSize: 24,
    fontWeight: "800",
  },
  modalSubtitle: {
    color: palette.textSoft,
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 16,
  },
  modalRow: {
    marginBottom: 16,
  },
  modalMeta: {
    color: palette.textSoft,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10,
  },
  segmentedRow: {
    flexDirection: "row",
    gap: 10,
  },
  segmentedButton: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.cardAlt,
    paddingVertical: 12,
    alignItems: "center",
  },
  segmentedButtonActive: {
    backgroundColor: palette.black,
    borderColor: palette.black,
  },
  segmentedButtonText: {
    color: palette.text,
    fontWeight: "700",
  },
  segmentedButtonTextActive: {
    color: palette.card,
  },
  checkoutFooter: {
    marginTop: 10,
    gap: 16,
  },
  checkoutActionRow: {
    flexDirection: "row",
    gap: 10,
  },
});

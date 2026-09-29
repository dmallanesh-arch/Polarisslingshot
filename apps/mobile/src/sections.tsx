import {
  formatCAD,
  getSpecs,
  isValidEmail,
  isValidPostalCode,
  specHighlights,
  type Dealer,
  type Feature,
  type Highlight,
  type LineupModel,
  type ModelPage,
  type TransmissionId,
} from '@slingshot/shared';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { FlatList, Linking, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { findDealers, subscribe } from './api';
import { Accent, Button, Eyebrow, Heading, Segmented } from './components/ui';
import { Vehicle } from './components/Vehicle';
import { colors, fonts, space } from './theme';

const TRANS_OPTIONS: { id: TransmissionId; label: string }[] = [
  { id: 'manual', label: 'Manual' },
  { id: 'auto', label: 'AutoDrive' },
];

/* ---------- Hero + configurator ---------- */
export function Showroom({ model, onBuild }: { model: ModelPage; onBuild: () => void }) {
  const { width } = useWindowDimensions();
  const [colorId, setColorId] = useState(model.colors[2]?.id ?? model.colors[0].id);
  const [trans, setTrans] = useState<TransmissionId>('manual');
  const color = model.colors.find((c) => c.id === colorId) ?? model.colors[0];
  const t = model.transmissions.find((x) => x.id === trans) ?? model.transmissions[0];

  return (
    <>
      <LinearGradient colors={['#25262c', '#111215', '#070708']} style={s.hero}>
        <View style={s.glow} />
        <Vehicle id="hero" paint={color.paint} accent={color.accent} width={width - 16} />
        <View style={s.pad}>
          <Eyebrow>{`${model.year} Slingshot`}</Eyebrow>
          <Text style={s.heroTitle}>SLINGSHOT</Text>
          <Text style={[s.heroTitle, s.heroAccent]}>{model.shortName}</Text>
          <Text style={s.lede}>
            <Text style={{ fontFamily: fonts.bodyBold, color: colors.text }}>{model.tagline} </Text>
            {model.lede}
          </Text>
          <View style={s.priceRow}>
            <Text style={s.priceLabel}>STARTING AT</Text>
            <Text style={s.priceValue}>{formatCAD(t.price)}<Text style={s.priceNote}>  MSRP*</Text></Text>
          </View>
          <View style={{ gap: 10 }}>
            <Button label="Build & Price" onPress={onBuild} />
            <Button label="Find a Dealer" variant="ghost" onPress={onBuild} />
          </View>
        </View>
      </LinearGradient>

      <View style={[s.pad, s.paper]}>
        <Eyebrow dark>Make it yours</Eyebrow>
        <Heading dark size={34}>Choose your colour</Heading>
        <Text style={[s.body, { color: colors.mutedInk, marginVertical: space.sm }]}>
          Three distinct colours, each finished with metal badges and SL accent graphics.
        </Text>
        <View style={s.swatches} accessibilityRole="radiogroup">
          {model.colors.map((c) => {
            const active = c.id === colorId;
            return (
              <Pressable
                key={c.id}
                accessibilityRole="radio"
                accessibilityLabel={c.name}
                accessibilityState={{ checked: active }}
                onPress={() => setColorId(c.id)}
                style={[s.swatchRing, active && { borderColor: colors.ink }]}
              >
                <LinearGradient colors={[c.swatch[0], c.paint, c.swatch[1]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.swatch} />
              </Pressable>
            );
          })}
        </View>
        <Text style={s.swatchName}>{color.name.toUpperCase()}</Text>
        <Text style={s.subhead}>TRANSMISSION</Text>
        <Segmented dark options={TRANS_OPTIONS} value={trans} onChange={setTrans} />
        <Text style={[s.small, { color: colors.mutedInk, marginTop: 10 }]}>{t.description}</Text>
      </View>
    </>
  );
}

/* ---------- Stats ---------- */
export function Stats({ items }: { items: Highlight[] }) {
  return (
    <View style={s.stats}>
      {items.map((h, i) => (
        <View key={h.label} style={[s.stat, i % 2 === 1 && s.statBorderL, i > 1 && s.statBorderT]}>
          <Text style={s.statValue}>{h.value}<Text style={s.statUnit}>{h.unit}</Text></Text>
          <Text style={s.statLabel}>{h.label.toUpperCase()}</Text>
        </View>
      ))}
    </View>
  );
}

/* ---------- Features ---------- */
export function Features({ features }: { features: Feature[] }) {
  return (
    <View style={[s.pad, s.section]}>
      <Eyebrow>Features</Eyebrow>
      <Heading>Engineered to <Accent>stand out</Accent></Heading>
      {features.map((f, i) => (
        <View key={f.id} style={s.feature}>
          <Text style={s.featureNum}>{String(i + 1).padStart(2, '0')}</Text>
          <Heading size={28}>{f.title}</Heading>
          <Text style={[s.body, { marginVertical: space.sm }]}>{f.body}</Text>
          {f.bullets.map((b) => (
            <View key={b} style={s.tick}>
              <View style={s.tickMark} />
              <Text style={s.tickText}>{b}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

/* ---------- Specs ---------- */
export function Specs() {
  const [trans, setTrans] = useState<TransmissionId>('manual');
  const [open, setOpen] = useState<string | null>('Engine');
  const groups = getSpecs(trans);

  return (
    <View style={[s.pad, s.paper, s.section]}>
      <Eyebrow dark>Specifications</Eyebrow>
      <Heading dark>Specs</Heading>
      <View style={{ marginVertical: space.md }}>
        <Segmented dark options={TRANS_OPTIONS} value={trans} onChange={setTrans} />
      </View>
      <View style={s.specHighlights}>
        {specHighlights.map((h) => (
          <View key={h.label} style={s.specHighlight}>
            <Text style={s.specHighlightValue}>{h.value}<Text style={s.specHighlightUnit}>{h.unit}</Text></Text>
            <Text style={s.specHighlightLabel}>{h.label.toUpperCase()}</Text>
          </View>
        ))}
      </View>
      <View style={{ borderTopWidth: 2, borderTopColor: colors.ink }}>
        {groups.map((g) => {
          const isOpen = open === g.group;
          return (
            <View key={g.group} style={s.accItem}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded: isOpen }}
                onPress={() => setOpen(isOpen ? null : g.group)}
                style={s.accHead}
              >
                <Text style={s.accTitle}>{g.group.toUpperCase()}</Text>
                <Text style={s.accIcon}>{isOpen ? '−' : '+'}</Text>
              </Pressable>
              {isOpen &&
                g.rows.map(([k, v], i) => (
                  <View key={k} style={[s.specRow, i % 2 === 0 && { backgroundColor: 'rgba(17,18,20,0.04)' }]}>
                    <Text style={s.specKey}>{k}</Text>
                    <Text style={s.specVal}>{v}</Text>
                  </View>
                ))}
            </View>
          );
        })}
      </View>
    </View>
  );
}

/* ---------- Compare ---------- */
export function Compare({ lineup }: { lineup: LineupModel[] }) {
  return (
    <View style={[s.section, { backgroundColor: colors.bg2 }]}>
      <View style={s.pad}>
        <Eyebrow>2026 Lineup</Eyebrow>
        <Heading>Compare models</Heading>
      </View>
      <FlatList
        horizontal
        data={lineup}
        keyExtractor={(m) => m.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: space.md, gap: 12, paddingTop: space.md }}
        snapToInterval={272}
        decelerationRate="fast"
        renderItem={({ item: m }) => (
          <View style={[s.card, m.current && s.cardCurrent]}>
            <Text style={[s.cardTag, m.current && s.cardTagCurrent]}>{(m.current ? 'You are here' : m.tag).toUpperCase()}</Text>
            <Vehicle id={`cmp-${m.id}`} paint={m.paint} width={228} />
            <Text style={s.cardName}>{m.name.toUpperCase()}</Text>
            <Text style={s.small}>
              {m.price ? <>Starting at <Text style={s.cardPrice}>{formatCAD(m.price)}</Text> MSRP</> : 'See dealer for pricing'}
            </Text>
            <View style={{ marginTop: 10 }}>
              {m.bullets.map((b) => <Text key={b} style={s.cardBullet}>{b}</Text>)}
            </View>
          </View>
        )}
      />
    </View>
  );
}

/* ---------- Dealer locator ---------- */
export function DealerLocator() {
  const [postal, setPostal] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<Dealer[] | null>(null);

  async function search() {
    if (!isValidPostalCode(postal)) {
      setMsg('Please enter a valid Canadian postal code (e.g. M5V 2T6).');
      return;
    }
    setBusy(true);
    setMsg('');
    try {
      const res = await findDealers(postal);
      setResults(res.dealers);
      if (!res.dealers.length) setMsg(`No dealers found near ${res.postal}.`);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Search failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={[s.pad, s.section, { backgroundColor: colors.brand }]}>
      <Text style={[s.eyebrowWhite]}>FIND A DEALER</Text>
      <Heading>Visit your local dealer</Heading>
      <TextInput
        style={s.input}
        placeholder="Postal code (e.g. M5V 2T6)"
        placeholderTextColor="#7a7a80"
        autoCapitalize="characters"
        autoCorrect={false}
        maxLength={7}
        value={postal}
        onChangeText={setPostal}
        onSubmitEditing={search}
        returnKeyType="search"
        accessibilityLabel="Postal code"
      />
      <Button label={busy ? 'Searching…' : 'Search'} variant="dark" onPress={search} disabled={busy} />
      {!!msg && <Text style={[s.small, { color: '#fff', marginTop: 10 }]}>{msg}</Text>}
      {results?.map((d) => (
        <View key={d.id} style={s.dealer}>
          <Text style={s.dealerName}>{d.name.toUpperCase()}</Text>
          <Text style={[s.small, { color: 'rgba(255,255,255,0.85)' }]}>{d.city}, {d.province}{d.demo ? ' · Demo rides' : ''}</Text>
          <Pressable onPress={() => Linking.openURL(`tel:${d.phone.replace(/\D/g, '')}`)}>
            <Text style={[s.small, { color: '#fff', textDecorationLine: 'underline' }]}>{d.phone}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

/* ---------- Footer / newsletter ---------- */
export function Footer({ disclaimer }: { disclaimer: string }) {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  async function signUp() {
    if (!isValidEmail(email)) {
      setMsg('Please enter a valid email address.');
      return;
    }
    try {
      const res = await subscribe(email);
      setMsg(res.message);
      setEmail('');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Something went wrong.');
    }
  }

  return (
    <View style={[s.pad, s.footer]}>
      <Heading size={26}>Stay in the loop</Heading>
      <Text style={[s.small, { marginVertical: 8 }]}>Get the latest Slingshot news, events and offers.</Text>
      <TextInput
        style={s.input}
        placeholder="Email address"
        placeholderTextColor="#7a7a80"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
        accessibilityLabel="Email address"
      />
      <Button label="Sign Up" onPress={signUp} />
      {!!msg && <Text style={[s.small, { marginTop: 10 }]}>{msg}</Text>}
      <Text style={s.legal}>{disclaimer}</Text>
      <Text style={s.logo}>SLINGSHOT</Text>
    </View>
  );
}

const s = StyleSheet.create({
  pad: { paddingHorizontal: space.md },
  section: { paddingVertical: space.xl },
  paper: { backgroundColor: colors.paper, paddingVertical: space.xl },
  hero: { paddingTop: space.lg, paddingBottom: space.xl, overflow: 'hidden' },
  glow: { position: 'absolute', width: 360, height: 360, borderRadius: 180, right: -120, top: -80, backgroundColor: 'rgba(225,10,31,0.09)' },
  heroTitle: { fontFamily: fonts.display, fontSize: 68, lineHeight: 62, color: colors.text },
  heroAccent: { fontFamily: fonts.displayItalic, color: colors.brand, marginBottom: space.md },
  lede: { fontFamily: fonts.body, fontSize: 16, lineHeight: 25, color: '#d4d4d8', marginBottom: space.md },
  priceRow: { borderLeftWidth: 3, borderLeftColor: colors.brand, paddingLeft: 14, marginBottom: space.md },
  priceLabel: { fontFamily: fonts.displayBold, fontSize: 13, letterSpacing: 2, color: colors.muted },
  priceValue: { fontFamily: fonts.display, fontSize: 40, color: colors.text },
  priceNote: { fontFamily: fonts.body, fontSize: 13, color: colors.muted },
  body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 25, color: '#c9c9ce' },
  small: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: colors.muted },
  swatches: { flexDirection: 'row', gap: 14, marginTop: 4 },
  swatchRing: { padding: 4, borderRadius: 40, borderWidth: 2, borderColor: 'transparent' },
  swatch: { width: 48, height: 48, borderRadius: 24 },
  swatchName: { fontFamily: fonts.displayBold, fontSize: 15, letterSpacing: 1.5, color: colors.ink, marginTop: 10 },
  subhead: { fontFamily: fonts.displayBold, fontSize: 17, letterSpacing: 1.4, color: colors.ink, marginTop: space.md, marginBottom: 10 },
  stats: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: colors.brand },
  stat: { width: '50%', paddingVertical: 26, alignItems: 'center' },
  statBorderL: { borderLeftWidth: 1, borderLeftColor: 'rgba(255,255,255,0.22)' },
  statBorderT: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.22)' },
  statValue: { fontFamily: fonts.display, fontSize: 52, color: '#fff', lineHeight: 54 },
  statUnit: { fontFamily: fonts.displayBold, fontSize: 20 },
  statLabel: { fontFamily: fonts.displayBold, fontSize: 12, letterSpacing: 1.4, color: '#fff', textAlign: 'center', paddingHorizontal: 8 },
  feature: { marginTop: space.xl },
  featureNum: { fontFamily: fonts.display, fontSize: 56, color: 'rgba(255,255,255,0.18)', lineHeight: 58 },
  tick: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderTopWidth: 1, borderTopColor: colors.line },
  tickMark: { width: 12, height: 7, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: colors.brandHi, transform: [{ rotate: '-45deg' }], marginTop: -4 },
  tickText: { fontFamily: fonts.bodyMedium, fontSize: 15, color: colors.text, flex: 1 },
  specHighlights: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#fff', borderWidth: 1, borderColor: colors.lineInk, marginBottom: space.lg },
  specHighlight: { width: '50%', padding: 16, borderColor: colors.lineInk, borderWidth: 0.5 },
  specHighlightValue: { fontFamily: fonts.display, fontSize: 36, color: colors.ink },
  specHighlightUnit: { fontFamily: fonts.displayBold, fontSize: 16 },
  specHighlightLabel: { fontFamily: fonts.displayBold, fontSize: 11, letterSpacing: 1.2, color: colors.mutedInk },
  accItem: { borderBottomWidth: 1, borderBottomColor: colors.lineInk },
  accHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18 },
  accTitle: { fontFamily: fonts.display, fontSize: 22, color: colors.ink },
  accIcon: { fontFamily: fonts.displayBold, fontSize: 26, color: colors.brand },
  specRow: { flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 8, gap: 12 },
  specKey: { flex: 1, fontFamily: fonts.bodyBold, fontSize: 14, color: colors.mutedInk },
  specVal: { flex: 1.3, fontFamily: fonts.bodyBold, fontSize: 14, color: colors.ink },
  card: { width: 260, backgroundColor: colors.bg3, borderWidth: 1, borderColor: colors.line, padding: 16 },
  cardCurrent: { borderColor: colors.brand, borderTopWidth: 4 },
  cardTag: { alignSelf: 'flex-start', fontFamily: fonts.displayBold, fontSize: 11, letterSpacing: 1.4, color: colors.muted, borderWidth: 1, borderColor: colors.line, paddingHorizontal: 8, paddingVertical: 2 },
  cardTagCurrent: { backgroundColor: colors.brand, borderColor: colors.brand, color: '#fff' },
  cardName: { fontFamily: fonts.display, fontSize: 24, color: colors.text },
  cardPrice: { fontFamily: fonts.display, fontSize: 20, color: colors.text },
  cardBullet: { fontFamily: fonts.body, fontSize: 14, color: '#d4d4d8', paddingVertical: 7, borderTopWidth: 1, borderTopColor: colors.line },
  eyebrowWhite: { fontFamily: fonts.displayBold, fontSize: 13, letterSpacing: 2.6, color: '#fff', marginBottom: 10 },
  input: { height: 52, backgroundColor: '#fff', color: colors.ink, paddingHorizontal: 16, fontFamily: fonts.body, fontSize: 16, marginTop: space.md, marginBottom: 10 },
  dealer: { marginTop: 12, padding: 14, backgroundColor: 'rgba(0,0,0,0.18)', gap: 2 },
  dealerName: { fontFamily: fonts.display, fontSize: 20, color: '#fff' },
  footer: { backgroundColor: '#000', borderTopWidth: 3, borderTopColor: colors.brand, paddingVertical: space.xl },
  legal: { fontFamily: fonts.body, fontSize: 11, lineHeight: 16, color: colors.muted, marginTop: space.lg },
  logo: { fontFamily: fonts.displayItalic, fontSize: 22, letterSpacing: 3, color: colors.text, marginTop: space.lg },
});

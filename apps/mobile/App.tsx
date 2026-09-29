// Import individual weights so only the fonts in use are bundled.
import { Barlow_400Regular } from '@expo-google-fonts/barlow/400Regular';
import { Barlow_500Medium } from '@expo-google-fonts/barlow/500Medium';
import { Barlow_600SemiBold } from '@expo-google-fonts/barlow/600SemiBold';
import { BarlowCondensed_700Bold } from '@expo-google-fonts/barlow-condensed/700Bold';
import { BarlowCondensed_700Bold_Italic } from '@expo-google-fonts/barlow-condensed/700Bold_Italic';
import { BarlowCondensed_800ExtraBold } from '@expo-google-fonts/barlow-condensed/800ExtraBold';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { fallbackPage, fetchModelPage, type ModelPageData } from './src/api';
import { Compare, DealerLocator, Features, Footer, Showroom, Specs, Stats } from './src/sections';
import { colors, fonts } from './src/theme';

const TABS = ['Overview', 'Features', 'Specs', 'Compare', 'Dealer'] as const;
type Tab = (typeof TABS)[number];

export default function App() {
  const [fontsLoaded] = useFonts({
    Barlow_400Regular,
    Barlow_500Medium,
    Barlow_600SemiBold,
    BarlowCondensed_700Bold,
    BarlowCondensed_700Bold_Italic,
    BarlowCondensed_800ExtraBold,
  });
  const [data, setData] = useState<ModelPageData>(fallbackPage);
  const [active, setActive] = useState<Tab>('Overview');
  const scroll = useRef<ScrollView>(null);
  const offsets = useRef<Partial<Record<Tab, number>>>({});

  useEffect(() => {
    fetchModelPage('sl').then(setData);
  }, []);

  const jump = (tab: Tab) => {
    setActive(tab);
    scroll.current?.scrollTo({ y: Math.max(0, (offsets.current[tab] ?? 0) - 48), animated: true });
  };

  const mark = (tab: Tab) => (e: { nativeEvent: { layout: { y: number } } }) => {
    offsets.current[tab] = e.nativeEvent.layout.y;
  };

  if (!fontsLoaded) {
    return (
      <View style={[styles.fill, styles.center]}>
        <ActivityIndicator color={colors.brand} />
      </View>
    );
  }

  const { model, lineup, disclaimers } = data;

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView style={styles.fill} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.logo}>SLINGSHOT</Text>
          <Text style={styles.model}><Text style={{ color: colors.brandHi }}>{model.year}</Text> {model.name.toUpperCase()}</Text>
        </View>

        <ScrollView
          ref={scroll}
          stickyHeaderIndices={[0]}
          scrollEventThrottle={32}
          onScroll={(e) => {
            const y = e.nativeEvent.contentOffset.y + 60;
            const current = [...TABS].reverse().find((t) => (offsets.current[t] ?? Infinity) <= y);
            if (current && current !== active) setActive(current);
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs} contentContainerStyle={styles.tabsInner}>
            {TABS.map((t) => (
              <Pressable key={t} onPress={() => jump(t)} accessibilityRole="tab" accessibilityState={{ selected: active === t }} style={styles.tab}>
                <Text style={[styles.tabLabel, active === t && styles.tabLabelActive]}>{t.toUpperCase()}</Text>
                {active === t && <View style={styles.tabBar} />}
              </Pressable>
            ))}
          </ScrollView>

          <View onLayout={mark('Overview')}>
            <Showroom model={model} onBuild={() => jump('Dealer')} />
            <Stats items={model.highlights} />
          </View>
          <View onLayout={mark('Features')}><Features features={model.features} /></View>
          <View onLayout={mark('Specs')}><Specs /></View>
          <View onLayout={mark('Compare')}><Compare lineup={lineup} /></View>
          <View onLayout={mark('Dealer')}><DealerLocator /></View>
          <Footer disclaimer={disclaimers.price} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: colors.bg },
  center: { alignItems: 'center', justifyContent: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, height: 56, borderBottomWidth: 1, borderBottomColor: colors.line },
  logo: { fontFamily: fonts.displayItalic, fontSize: 24, letterSpacing: 3, color: colors.text },
  model: { fontFamily: fonts.display, fontSize: 16, color: colors.text },
  tabs: { backgroundColor: colors.bg2, borderBottomWidth: 1, borderBottomColor: colors.line },
  tabsInner: { paddingHorizontal: 8 },
  tab: { paddingHorizontal: 14, height: 48, justifyContent: 'center' },
  tabLabel: { fontFamily: fonts.displayBold, fontSize: 14, letterSpacing: 1.6, color: colors.muted },
  tabLabelActive: { color: colors.text },
  tabBar: { position: 'absolute', left: 14, right: 14, bottom: 0, height: 3, backgroundColor: colors.brand },
});

import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors, fonts } from '../theme';

export function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <View style={styles.eyebrowRow}>
      <View style={[styles.eyebrowLine, dark && { backgroundColor: colors.brand }]} />
      <Text style={[styles.eyebrow, dark && { color: colors.brand }]}>{children}</Text>
    </View>
  );
}

export function Heading({ children, dark, size = 40 }: { children: ReactNode; dark?: boolean; size?: number }) {
  return <Text style={[styles.heading, { fontSize: size, lineHeight: size * 0.98 }, dark && { color: colors.ink }]}>{children}</Text>;
}

export function Accent({ children }: { children: ReactNode }) {
  return <Text style={styles.accent}>{children}</Text>;
}

type Variant = 'primary' | 'ghost' | 'dark';

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled,
  style,
}: {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        variant === 'primary' && styles.btnPrimary,
        variant === 'ghost' && styles.btnGhost,
        variant === 'dark' && styles.btnDark,
        (pressed || disabled) && { opacity: 0.8 },
        style,
      ]}
    >
      <Text style={styles.btnLabel}>{label.toUpperCase()}</Text>
    </Pressable>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  dark,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  dark?: boolean;
}) {
  return (
    <View style={[styles.seg, { borderColor: dark ? colors.lineInk : colors.line }]} accessibilityRole="tablist">
      {options.map((o) => {
        const active = o.id === value;
        return (
          <Pressable
            key={o.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(o.id)}
            style={[styles.segBtn, active && { backgroundColor: colors.brand }]}
          >
            <Text style={[styles.segLabel, { color: active ? '#fff' : dark ? colors.mutedInk : colors.muted }]}>
              {o.label.toUpperCase()}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export const styles = StyleSheet.create({
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  eyebrowLine: { width: 24, height: 2, backgroundColor: colors.brandHi },
  eyebrow: { fontFamily: fonts.displayBold, fontSize: 13, letterSpacing: 2.6, color: colors.brandHi, textTransform: 'uppercase' },
  heading: { fontFamily: fonts.display, color: colors.text, textTransform: 'uppercase' },
  accent: { fontFamily: fonts.displayItalic, color: colors.brand },
  btn: { minHeight: 50, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'transparent' },
  btnPrimary: { backgroundColor: colors.brand, borderColor: colors.brand },
  btnGhost: { borderColor: 'rgba(255,255,255,0.6)' },
  btnDark: { backgroundColor: colors.ink, borderColor: colors.ink },
  btnLabel: { fontFamily: fonts.displayBold, fontSize: 16, letterSpacing: 1.8, color: '#fff' },
  seg: { flexDirection: 'row', alignSelf: 'flex-start', borderWidth: 1, padding: 4, gap: 4 },
  segBtn: { paddingVertical: 10, paddingHorizontal: 20 },
  segLabel: { fontFamily: fonts.displayBold, fontSize: 14, letterSpacing: 1.6 },
});

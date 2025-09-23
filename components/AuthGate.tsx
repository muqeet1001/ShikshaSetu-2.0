import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { setItem } from '../utils/storage';

const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

interface Props {
  onDone: () => void;
}

type Mode = 'menu' | 'login' | 'signup';

const FilledButton = ({ label, onPress, icon }:{ label: string; onPress?: () => void; icon?: any }) => (
  <TouchableOpacity style={styles.filledBtn} onPress={onPress} activeOpacity={0.9}>
    {icon && <MaterialIcons name={icon as any} size={18} color="#FFFFFF" style={{ marginRight: 8 }} />}
    <Text style={styles.filledBtnText}>{label}</Text>
  </TouchableOpacity>
);

const OutlineButton = ({ label, onPress, icon }:{ label: string; onPress?: () => void; icon?: any }) => (
  <TouchableOpacity style={styles.outlineBtn} onPress={onPress} activeOpacity={0.9}>
    {icon && <MaterialIcons name={icon as any} size={18} color={NAVY} style={{ marginRight: 8 }} />}
    <Text style={styles.outlineBtnText}>{label}</Text>
  </TouchableOpacity>
);

const LinkButton = ({ label, onPress }:{ label: string; onPress?: () => void }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.link}>{label}</Text>
  </TouchableOpacity>
);

const AuthGate = ({ onDone }: Props) => {
  const [mode, setMode] = useState<Mode>('menu');
  // Login form
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const loginUserRef = useRef<TextInput>(null);
  const loginPassRef = useRef<TextInput>(null);

  // Signup wizard state
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentClass, setCurrentClass] = useState('');
  const [board, setBoard] = useState('');
  const [marks10, setMarks10] = useState('');
  const [marks12, setMarks12] = useState('');
  const [district, setDistrict] = useState('');
  const [area, setArea] = useState('');

  // Refs for focusing sequence in wizard
  const usernameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const classRef = useRef<TextInput>(null);
  const boardRef = useRef<TextInput>(null);
  const marks10Ref = useRef<TextInput>(null);
  const marks12Ref = useRef<TextInput>(null);
  const districtRef = useRef<TextInput>(null);
  const areaRef = useRef<TextInput>(null);

  const complete = async (profile: any) => {
    try {
      await setItem('SS_USER_PROFILE', JSON.stringify(profile));
      await setItem('SS_AUTH_DONE', '1');
    } catch {}
    onDone();
  };

  const onLogin = async () => {
    // Accept any username/password and proceed
    await complete({ username: loginUser, name: loginUser });
  };

  const onFinishSignup = async () => {
    // Accept any values and finish
    await complete({
      username,
      name: username,
      email,
      currentClass,
      board,
      marks10,
      marks12,
      district,
      area,
    });
  };

  const onSkip = async () => {
    await complete({ username: 'Guest', name: 'Guest' });
  };

  const Title = () => (
    <View style={styles.titleBlock}>
      <View style={styles.logoCircle}>
        <MaterialIcons name="school" size={28} color={NAVY} />
      </View>
      <Text style={styles.title}>Welcome to Urooj</Text>
      <Text style={styles.subtitle}>Find courses, colleges, scholarships and guidance</Text>
    </View>
  );

  // Focus first field of each step when step changes
  useEffect(() => {
    if (mode !== 'signup') return;
    const focusTarget = step === 0 ? usernameRef
      : step === 1 ? classRef
      : step === 2 ? boardRef
      : step === 3 ? marks10Ref
      : step === 4 ? districtRef
      : areaRef;
    setTimeout(() => focusTarget.current?.focus(), 0);
  }, [mode, step]);

  const SignupStep = () => (
    <View>
      {/* Step 0: username/email/password */}
      <View style={{ display: step === 0 ? 'flex' : 'none' }}>
        <Text style={styles.formTitle}>Your name / username</Text>
        <View style={styles.inputRow}>
          <MaterialIcons name="badge" size={18} color={NAVY} />
          <TextInput
            ref={usernameRef}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            importantForAutofill="no"
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
          />
        </View>
        <View style={styles.inputRow}>
          <MaterialIcons name="email" size={18} color={NAVY} />
          <TextInput
            ref={emailRef}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            importantForAutofill="no"
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
        </View>
        <View style={styles.inputRow}>
          <MaterialIcons name="lock" size={18} color={NAVY} />
          <TextInput
            ref={passwordRef}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            secureTextEntry
            autoCorrect={false}
            importantForAutofill="no"
            blurOnSubmit={false}
            returnKeyType="done"
            onSubmitEditing={() => setStep(1)}
          />
        </View>
      </View>

      {/* Step 1: current class */}
      <View style={{ display: step === 1 ? 'flex' : 'none' }}>
        <Text style={styles.formTitle}>Current Class</Text>
        <View style={styles.inputRow}>
          <MaterialIcons name="class" size={18} color={NAVY} />
          <TextInput
            ref={classRef}
            value={currentClass}
            onChangeText={setCurrentClass}
            placeholder="e.g., 10th, 11th, 12th, B.Com..."
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            autoCorrect={false}
            importantForAutofill="no"
            blurOnSubmit={false}
            returnKeyType="done"
            onSubmitEditing={() => setStep(2)}
          />
        </View>
      </View>

      {/* Step 2: board */}
      <View style={{ display: step === 2 ? 'flex' : 'none' }}>
        <Text style={styles.formTitle}>Board</Text>
        <View style={styles.inputRow}>
          <MaterialIcons name="assignment" size={18} color={NAVY} />
          <TextInput
            ref={boardRef}
            value={board}
            onChangeText={setBoard}
            placeholder="CBSE / ICSE / JKBOSE ..."
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            autoCorrect={false}
            importantForAutofill="no"
            blurOnSubmit={false}
            returnKeyType="done"
            onSubmitEditing={() => setStep(3)}
          />
        </View>
      </View>

      {/* Step 3: marks */}
      <View style={{ display: step === 3 ? 'flex' : 'none' }}>
        <Text style={styles.formTitle}>Marks</Text>
        <View style={styles.inputRow}>
          <MaterialIcons name="looks-one" size={18} color={NAVY} />
          <TextInput
            ref={marks10Ref}
            value={marks10}
            onChangeText={setMarks10}
            placeholder="10th %"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            keyboardType="numeric"
            autoCorrect={false}
            importantForAutofill="no"
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => marks12Ref.current?.focus()}
          />
        </View>
        <View style={styles.inputRow}>
          <MaterialIcons name="looks-two" size={18} color={NAVY} />
          <TextInput
            ref={marks12Ref}
            value={marks12}
            onChangeText={setMarks12}
            placeholder="12th %"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            keyboardType="numeric"
            autoCorrect={false}
            importantForAutofill="no"
            blurOnSubmit={false}
            returnKeyType="done"
            onSubmitEditing={() => setStep(4)}
          />
        </View>
      </View>

      {/* Step 4: district */}
      <View style={{ display: step === 4 ? 'flex' : 'none' }}>
        <Text style={styles.formTitle}>District</Text>
        <View style={styles.inputRow}>
          <MaterialIcons name="map" size={18} color={NAVY} />
          <TextInput
            ref={districtRef}
            value={district}
            onChangeText={setDistrict}
            placeholder="Enter district"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            autoCorrect={false}
            importantForAutofill="no"
            blurOnSubmit={false}
            returnKeyType="done"
            onSubmitEditing={() => setStep(5)}
          />
        </View>
      </View>

      {/* Step 5: area */}
      <View style={{ display: step === 5 ? 'flex' : 'none' }}>
        <Text style={styles.formTitle}>Area</Text>
        <View style={styles.inputRow}>
          <MaterialIcons name="place" size={18} color={NAVY} />
          <TextInput
            ref={areaRef}
            value={area}
            onChangeText={setArea}
            placeholder="Enter area / locality"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            autoCorrect={false}
            importantForAutofill="no"
            blurOnSubmit={false}
            returnKeyType="done"
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
        <OutlineButton label="Back" icon="arrow-back" onPress={() => setStep(s => Math.max(0, s - 1))} />
        {step < 5 ? (
          <FilledButton label="Next" icon="arrow-forward" onPress={() => setStep(s => Math.min(5, s + 1))} />
        ) : (
          <FilledButton label="Create account" icon="person-add" onPress={onFinishSignup} />
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="always" keyboardDismissMode="none" removeClippedSubviews={false}>
        <View style={[styles.centerWrap, mode === 'signup' && { justifyContent: 'flex-start' }]}>
          <Title />

          {mode === 'menu' && (
            <View style={styles.card}>
              <FilledButton label="Login" icon="login" onPress={() => setMode('login')} />
              <OutlineButton label="Sign up" icon="person-add" onPress={() => { setMode('signup'); setStep(0); }} />
              <OutlineButton label="Skip login" icon="arrow-forward" onPress={onSkip} />
              <View style={{ height: 8 }} />
              <Text style={styles.terms}>By continuing, you agree to our Terms & Privacy Policy</Text>
            </View>
          )}

          {mode === 'login' && (
            <View style={styles.card}>
              <Text style={styles.formTitle}>Log in</Text>
              <View style={styles.inputRow}>
                <MaterialIcons name="person" size={18} color={NAVY} />
                <TextInput
                  ref={loginUserRef}
                  value={loginUser}
                  onChangeText={setLoginUser}
                  placeholder="Username"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  autoCapitalize="none"
                  blurOnSubmit={false}
                  returnKeyType="next"
                  onSubmitEditing={() => loginPassRef.current?.focus()}
                />
              </View>
              <View style={styles.inputRow}>
                <MaterialIcons name="lock" size={18} color={NAVY} />
                <TextInput
                  ref={loginPassRef}
                  value={loginPass}
                  onChangeText={setLoginPass}
                  placeholder="Password"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  secureTextEntry
                  blurOnSubmit={false}
                  returnKeyType="done"
                />
              </View>
              <FilledButton label="Continue" icon="arrow-forward" onPress={onLogin} />
              <LinkButton label="Back" onPress={() => setMode('menu')} />
            </View>
          )}

          {mode === 'signup' && (
            <View style={styles.card}>
              <SignupStep />
              <LinkButton label="Back to menu" onPress={() => setMode('menu')} />
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: NAVY,
  },
  centerWrap: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  titleBlock: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  subtitle: {
    color: '#E8E8E8',
    marginTop: 6,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D6DEE8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },
  filledBtn: {
    backgroundColor: NAVY,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  filledBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  outlineBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: NAVY,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  outlineBtnText: {
    color: NAVY,
    fontWeight: '800',
  },
  link: {
    color: NAVY,
    fontWeight: '700',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 8,
    color: '#6B7280',
    fontSize: 12,
  },
  terms: {
    marginTop: 10,
    color: '#6B7280',
    fontSize: 12,
    textAlign: 'center',
  },
  formTitle: {
    color: NAVY,
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 6,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D6DEE8',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 8,
    backgroundColor: '#FFFFFF',
  },
  input: {
    marginLeft: 8,
    flex: 1,
    color: '#111827',
  },
});

export default AuthGate;

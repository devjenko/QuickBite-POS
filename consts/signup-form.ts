export const PASSWORD_REQUIREMENTS = [
  { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
  { label: "Contains an uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
  { label: "Contains a lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
  { label: "Contains a number", test: (pw: string) => /[0-9]/.test(pw) },
  { label: "Contains a special character", test: (pw: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw) },
  { label: "No spaces", test: (pw: string) => !/\s/.test(pw) },
];
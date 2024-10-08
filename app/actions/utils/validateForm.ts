export default function validateForm(
  formData: FormData,
  requiredFields: string[]
) {
  const data: { [key: string]: string | File } = {};
  for (const field of requiredFields) {
    const value = formData.get(field);
    if (!value || (typeof value === "string" && !value.trim())) return null;
    data[field] = typeof value === "string" ? value.trim() : (value as File);
  }
  return data;
}

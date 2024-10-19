import SelectInput from "@/app/components/UI/inputs/SelectInput";
import { QueryParams } from "@/app/types/QueryParams";

type Props = {
  queryParams: QueryParams;
  setQueryParams: (newParams: Record<string, string>) => string;
};

export default function CategoryFilter({ queryParams, setQueryParams }: Props) {
  return (
    <SelectInput
      name={"category"}
      id={"category"}
      className="w-full sm:w-auto"
      defaultValue={queryParams.category?.toString() || ""}
      onChange={(e) => {
        setQueryParams({ category: e.target.value });
      }}
    >
      <option value="">Todas las categorías</option>
      <option value="desayuno">Desayuno</option>
      <option value="comida">Comida</option>
      <option value="cena">Cena</option>
      <option value="postre">Postre</option>
      <option value="bebida">Bebida</option>
    </SelectInput>
  );
}

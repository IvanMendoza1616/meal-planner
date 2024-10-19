import SelectInput from "@/app/components/UI/inputs/SelectInput";
import { QueryParams } from "@/app/types/QueryParams";

type Props = {
  queryParams: QueryParams;
  setQueryParams: (newParams: Record<string, string>) => string;
};

export default function SortSelect({ queryParams, setQueryParams }: Props) {
  return (
    <div className="flex items-center gap-2 sm:w-auto w-full">
      <p className="text-nowrap">Ordenar por:</p>
      <SelectInput
        name={"sort"}
        id={"sort"}
        className=" w-full sm:w-auto"
        defaultValue={queryParams.sort?.toString() || ""}
        onChange={(e) => {
          setQueryParams({ sort: e.target.value });
        }}
      >
        <option value="">Más recientes</option>
        <option value="oldest">Más antiguos</option>
        <option value="preparation-minutes-ascending">Menor tiempo</option>
        <option value="preparation-minutes-descending">Mayor tiempo</option>
      </SelectInput>
    </div>
  );
}

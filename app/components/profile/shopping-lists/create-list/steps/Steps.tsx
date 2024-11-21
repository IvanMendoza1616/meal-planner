import { CheckIcon } from "@heroicons/react/24/solid";

type Props = {
  step: number;
};

export default function Steps({ step }: Props) {
  const activeStep = "border-primary bg-primary text-white";
  const pendingStep = "border-gray-300 text-gray-400";
  const completedStep = "border-green-600 bg-green-100 text-green-700";

  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      <div
        className={`flex aspect-square w-10 items-center justify-center rounded-full border ${
          step > 1 ? completedStep : activeStep
        }`}
      >
        {step > 1 ? <CheckIcon className="h-4 w-4" /> : <p className="">1</p>}
      </div>
      <div
        className={`h-[1px] w-12 ${step > 1 ? "bg-green-600" : "bg-gray-300"}`}
      />
      <div
        className={`flex aspect-square w-10 items-center justify-center rounded-full border ${
          step < 2 ? pendingStep : step > 2 ? completedStep : activeStep
        }`}
      >
        {step > 2 ? <CheckIcon className="h-4 w-4" /> : <p className="">2</p>}
      </div>
      <div
        className={`h-[1px] w-12 ${step > 2 ? "bg-green-600" : "bg-gray-300"}`}
      />
      <div
        className={`flex aspect-square w-10 items-center justify-center rounded-full border ${
          step < 3 ? pendingStep : step > 3 ? completedStep : activeStep
        }`}
      >
        {step > 3 ? <CheckIcon className="h-4 w-4" /> : <p className="">3</p>}
      </div>
    </div>
  );
}

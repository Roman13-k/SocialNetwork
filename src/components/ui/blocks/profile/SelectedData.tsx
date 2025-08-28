import React from "react";
import { DataVariantsType } from "./UserInfluence";

export default function SelectedData({ selectedVariant }: { selectedVariant: DataVariantsType }) {
  return <div>{selectedVariant}</div>;
}

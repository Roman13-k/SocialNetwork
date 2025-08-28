"use client";
import React, { Dispatch, SetStateAction } from "react";
import { DataVariantsType, variants } from "./UserInfluence";

interface VariantsProps {
  selectedVariant: DataVariantsType;
  setSelectedVariant: Dispatch<SetStateAction<DataVariantsType>>;
}

export default function Variants({ selectedVariant, setSelectedVariant }: VariantsProps) {
  return (
    <div className='flex '>
      {variants.map((v, index) => (
        <button
          onClick={() => setSelectedVariant(v)}
          className={`border border-border px-10 py-4 text-text-primary text-2xl hover:bg-background-secondary/60 uppercase ${
            selectedVariant === v ? "bg-background-secondary" : ""
          } cursor-pointer`}
          key={index}>
          {v}
        </button>
      ))}
    </div>
  );
}

"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { LapanganType } from "@/data/lapangan";
import FieldDetails from "./FieldDetails";

interface FieldSelectorProps {
  fields: LapanganType[];
  selectedFieldId: string;
  onFieldSelect: (id: string) => void;
  currentField: LapanganType | undefined;
}

export default function FieldSelector({
  fields,
  selectedFieldId,
  onFieldSelect,
  currentField,
}: FieldSelectorProps) {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-neutral-800">
        Pilih Lapangan Olahraga Anda
      </h2>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            className="capitalize w-full justify-between border transition-colors bg-white text-gray-800 hover:bg-gray-100 border-gray-300"
          >
            {currentField?.name || "Pilih Lapangan..."}
            <ChevronDownIcon className="w-5 h-5" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Pilih Lapangan"
          selectionMode="single"
          selectedKeys={new Set([selectedFieldId])}
          onSelectionChange={(keys) =>
            onFieldSelect(Array.from(keys)[0] as string)
          }
          className="rounded-xl shadow-lg bg-white border border-gray-200"
        >
          {fields.map((field, index) => (
            <DropdownItem
              key={field.id.toString()}
              className={clsx(
                "text-neutral-800",
                "hover:bg-gray-100",
                index < fields.length - 1 && "border-b border-gray-200"
              )}
            >
              {field.name} ({field.sport})
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {currentField && <FieldDetails field={currentField} />}
    </div>
  );
}

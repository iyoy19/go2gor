"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";

interface FasilitasCardProps {
  name: string;
  description: string;
  image: string;
  features: string[];
}

export const FasilitasCard = ({
  name,
  description,
  image,
  features,
}: FasilitasCardProps) => {
  return (
    <Card className="w-full bg-transparent shadow-lg hover:shadow-primary/50 transition-shadow duration-300 border border-gray-700">
      <CardHeader className="p-0">
        <Image
          alt={name}
          className="object-cover w-full h-[220px]"
          src={image}
        />
      </CardHeader>
      <CardBody className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-black">{name}</h3>
        <p className="text-gray-800">{description}</p>
      </CardBody>
      <CardFooter className="p-6 pt-0">
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <Chip key={index} color="primary" variant="flat">
              {feature}
            </Chip>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

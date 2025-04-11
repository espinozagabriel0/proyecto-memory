import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardProps = {
    nom: string,
    imatge: string
}
export default function Tarjeta({ nom, imatge } : CardProps) {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{nom}</p>
      </CardContent>
      <CardFooter>
        <p className="w-full">{imatge}</p>
      </CardFooter>
    </Card>
  );
}

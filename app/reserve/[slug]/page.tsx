import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Form from "./components/Form";
import Header from "./components/Header";

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

export default async function Reserve({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { date: string; partySize: string };
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <>
      <div className="border-t h-screen">
        <div className="py-9 m-auto w-3/5">
          <Header
            image={restaurant.main_image}
            name={restaurant.name}
            date={searchParams.date}
            partySize={searchParams.partySize}
          />
          <Form
            date={searchParams.date}
            partySize={searchParams.partySize}
            slug={params.slug}
          />
        </div>
      </div>
    </>
  );
}

import React from "react";
import WishClient from "./Client";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

const getWish = async (personId: string) => {
  const body = {
    lastWish: null,
  };
  const res = await fetch(`${process.env.DOMAIN}/api/v1/wishes/${personId}`, {
    method: "POST",
    headers: {
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(body),
    cache: "no-cache",
  });

  if (!res.ok) return undefined;

  return res.json();
};

async function WishPage({ params }: { params: { personId: string } }) {
  const { personId } = params;

  const result = await getWish(personId);

  if (!result || result.error) {
    notFound();
  }

  return <WishClient personId={personId} />;
}

export default WishPage;

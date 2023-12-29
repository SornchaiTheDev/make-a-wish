
import React from "react";
import WishClient from "./Client";
import { notFound } from "next/navigation";

const getWish = async (personId: string) => {
    const body = {
        lastWish: null,
    };
    const res = await fetch(`${process.env.DOMAIN}/api/v1/wishes/${personId}`, {
        method: "POST",
        body: JSON.stringify(body),
        cache: "no-cache",
    });

    if (!res.ok) return undefined;

    return res.json();
};

async function WishPage({ params }: { params: { personId: string } }) {
    const { personId } = params;

    const result = await getWish(personId);

    if (!result) {
        notFound();
    }

    return <WishClient personId={personId} />;
}

export default WishPage;

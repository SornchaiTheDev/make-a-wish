import { notFound } from "next/navigation";
import SendClient from "./Client";

const getUsername = async (personId: string) => {
  const res = await fetch(`${process.env.DOMAIN}/api/v1/person/${personId}`);

  if (!res.ok) {
    notFound();
  }

  return res.json();
};

async function SendPage({ params }: { params: { personId: string } }) {
  const { personId } = params;

  const res = await getUsername(personId);

  return <SendClient username={res.username} personId={personId} />;
}

export default SendPage;

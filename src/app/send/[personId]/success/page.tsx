import { notFound } from "next/navigation";
import SendSuccessClient from "./Client";

const getUsername = async (personId: string) => {
  const res = await fetch(`${process.env.DOMAIN}/api/v1/person/${personId}`);

  if (!res.ok) {
    notFound();
  }

  return res.json();
};

async function SendSuccessPage({ params }: { params: { personId: string } }) {
  const { personId } = params;

  const res = await getUsername(personId);
  return <SendSuccessClient username={res.username} />;
}

export default SendSuccessPage;

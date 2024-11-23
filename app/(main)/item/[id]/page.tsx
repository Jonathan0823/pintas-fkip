type Params = Promise<{ id: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { id } = await params;
  return <div>{id}</div>;
};

export default Page;

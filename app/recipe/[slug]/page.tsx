export default async function Page({ params }: { params: { slug: string } }) {
  console.log(params);

  return <div>test</div>;
}

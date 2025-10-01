const cats = [
  { title: 'Mobiles' },
  { title: 'Laptops' },
  { title: 'Headphones' },
  { title: 'Smartwatch' },
  { title: 'Gaming' },
  { title: 'Cameras' },
  { title: 'TVs' },
];

export default function CategoryStrip() {
  return (
    <section className="container-max mt-8">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
        {cats.map((c) => (
          <button
            key={c.title}
            className="card flex h-24 flex-col items-center justify-center gap-2 hover:shadow"
          >
            <div className="h-10 w-10 rounded-full bg-brand/10" />
            <span className="text-sm font-medium">{c.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

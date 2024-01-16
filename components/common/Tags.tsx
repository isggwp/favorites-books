"use client"

type ListTags = {
  tags: String[];
};

const Tags = ({ tags }: ListTags) => {
  return (
    <>
      <section className="flex flex-row gap-3">
        {tags?.map((tag, i) => {
          return (
            <div key={i} className="text-[0.50rem] italic rounded-full uppercase font-bold font-sans  cursor-pointer bg-indigo-100 hover:bg-indigo-200 tracking-wider text-gray-700  py-1 px-3">
              {tag}
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Tags;

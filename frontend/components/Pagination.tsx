"use client";
interface PaginationProps {
  currentPage: number;
  pages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pages,
  onPageChange,
}) => {
  const getPaginationItems = (): (number | string)[] => {
    let items: (number | string)[] = [];
    let i = 1;

    while (i <= pages) {
      if (
        i === 1 ||
        i === pages ||
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        items.push(i);
      } else if (items[items.length - 1] !== "...") {
        items.push("...");
      }
      i++;
    }
    return items;
  };

  const paginationItems = getPaginationItems();

  return (
    <div className="flex items-center justify-center space-x-2 my-10">
      <button
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {paginationItems.map((item, index) => (
        <button
          key={index}
          className={`px-4 py-2 ${
            typeof item === "number" && item === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded hover:bg-gray-300 disabled:opacity-50`}
          onClick={() => typeof item === "number" && onPageChange(item)}
          disabled={item === "..."}
        >
          {item}
        </button>
      ))}
      <button
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        onClick={() => onPageChange(Math.min(pages, currentPage + 1))}
        disabled={currentPage === pages}
      >
        Next
      </button>
    </div>
  );
};

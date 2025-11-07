 const getPageNumbers = ({page=1, total_possible_pages=15, visiblePages=6 }) => {
    if (total_possible_pages <= visiblePages + 2) {
      return Array.from({ length: total_possible_pages }, (_, i) => i + 1);
    }

    let start = page - Math.floor(visiblePages / 2);
    let end = page + Math.floor(visiblePages / 2);  

    if (start < 2) {
      start = 2;
      end = start + visiblePages - 1;
    }
    if (end > total_possible_pages - 1) {
      end = total_possible_pages - 1;
      start = end - visiblePages + 1;
    }

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);

    if (start > 2) pages.unshift("left-ellipsis");
    if (end < total_possible_pages - 1) pages.push("right-ellipsis");

    return [1, ...pages, total_possible_pages];
  };

export default getPageNumbers;
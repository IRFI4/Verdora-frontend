import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@components/ui/pagination';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: number
  ) => {
    e.preventDefault();
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  const renderPages = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(0, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);

    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 0) {
        endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
      } else if (endPage === totalPages - 1) {
        startPage = Math.max(0, endPage - maxVisiblePages + 1);
      }
    }

    if (startPage > 0) {
      pages.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={currentPage === i}
            onClick={e => handlePageChange(e, i)}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages - 1) {
      pages.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination className="py-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={e => handlePageChange(e, currentPage - 1)}
            aria-disabled={currentPage === 0}
            className={
              currentPage === 0 ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
        {renderPages()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={e => handlePageChange(e, currentPage + 1)}
            aria-disabled={currentPage === totalPages - 1}
            className={
              currentPage === totalPages - 1
                ? 'pointer-events-none opacity-50'
                : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

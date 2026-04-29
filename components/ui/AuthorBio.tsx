interface AuthorBioProps {
  publishedDate: string
  updatedDate: string
}

export default function AuthorBio({ publishedDate, updatedDate }: AuthorBioProps) {
  return (
    <div className="py-4 mb-8 border-y border-[#e2e8f0]">
      <div className="flex items-center gap-3">

        <div className="w-9 h-9 bg-[#1d4ed8] rounded-md flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-[#0f2040]">My Swiss Insurance</p>
          <p className="text-sm text-[#475569]">Service éditorial indépendant · Lausanne, Suisse romande</p>
          <p className="text-sm text-[#475569]">Publié le {publishedDate}, mis à jour le {updatedDate}</p>
        </div>

      </div>
    </div>
  )
}

interface AuthorBioProps {
  publishedDate: string
  updatedDate: string
}

export default function AuthorBio({ publishedDate, updatedDate }: AuthorBioProps) {
  return (
    <div className="flex items-center gap-4 py-4 mb-8 border-y border-[#e2e8f0]">
      <div className="w-12 h-12 rounded-full bg-[#dbeafe] flex items-center justify-center flex-shrink-0 text-[#1d4ed8] font-semibold text-sm">
        MSI
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-[#0f2040]">
          La rédaction My Swiss Insurance
        </p>
        <p className="text-xs text-[#475569] mt-0.5">
          Service éditorial indépendant, Lausanne, Suisse romande
        </p>
        <p className="text-xs text-[#475569] mt-0.5">
          Publié le {publishedDate}, mis à jour le {updatedDate}
        </p>
      </div>
      <div className="flex-shrink-0">
        <span className="bg-[#dbeafe] text-[#1d4ed8] px-2 py-1 rounded text-xs font-medium">
          Données OFSP 2026
        </span>
      </div>
    </div>
  )
}

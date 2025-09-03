const StarRating = ({
    value,
    max = 5,
    onChange,
}: {
    value: number | null
    max?: number
    onChange?: (val: number) => void
}) => {
    return (
        <div className="flex">
            {Array.from({ length: max }, (_, i) => (
                <span
                    key={i}
                    className={`cursor-pointer ${i < (value || 0) ? "text-yellow-800" : "text-gray-300"}`}
                    onClick={() => onChange && onChange(i + 1)}
                >
                    ★
                </span>
            ))}
        </div>
    )
}

export default StarRating
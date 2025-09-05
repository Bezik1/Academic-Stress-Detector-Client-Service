export const sessionContainerVariants = {
    hidden: {},
    visible: {
        transition: {
        staggerChildren: 0.15,
        },
    },
};

export const sessionItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
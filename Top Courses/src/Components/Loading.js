import React from "react";

const Loading = () => {
    return (
        <div className="flex items-center flex-col space-y-2 mt-4">
            <div className="spinner"></div>
            <p className="text-lg text-bgDark font-semibold">Loading...</p>
        </div>
    );
};

export default Loading;
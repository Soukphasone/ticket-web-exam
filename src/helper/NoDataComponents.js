// NoDataComponent.js

const NoDataComponent = ({ imgSrc, altText }) => {
    return (
        <>
            <img
                src={imgSrc}
                alt={altText}
                className="centered-img"
                style={{ width: "120px" }}
            />
            {/* <span> ບໍ່ມີຂໍ້ມູນ</span> */}
        </>
    );
};

export default NoDataComponent;

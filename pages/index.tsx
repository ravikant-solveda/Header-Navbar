import { categories } from "@/categoryData";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [childCategory, setChildCategory] = useState<any>([]);
  const [childArray, setChildArray] = useState<any>([]);
  const router = useRouter();
  const { categoryName } = childCategory[0] || "";

  const handleClick = (parentId: any) => {
    setIsHover(true);
    const childData: any = categories.data.categoryArray.filter(
      (id) => id.uniqueID === parentId
    );
    setChildCategory(childData);
    setChildArray(childData[0].subCategoryArray);
    router.push(`/c/${childData[0].categoryIdentifier.toLowerCase()}`);
  };
  const handleHover = (parentId: any) => {
    setIsHover(true);
    const childData: any = categories.data.categoryArray.filter(
      (id) => id.uniqueID === parentId
    );
    setChildCategory(childData);
    setChildArray(childData[0].subCategoryArray);
  };
  const handleLeave = () => {
    setIsHover(false);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          backgroundColor: "blue",
          color: "white",
          height: "40px",
          lineHeight: "40px",
          fontSize: "18px",
        }}
      >
        <ul style={{ display: "flex", listStyle: "none" }}>
          {categories.data.categoryArray.map((data: any) => (
            <li
              style={{
                paddingRight: "3%",
                fontWeight: "500",
                cursor: "pointer",
                paddingLeft: "10px",
              }}
              onClick={() => handleClick(data.uniqueID)}
              onFocus={() => handleHover(data.uniqueID)}
              onBlur={handleLeave}
              onMouseUp={handleLeave}
              onMouseEnter={() => handleHover(data.uniqueID)}
            >
              {data.categoryName.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {isHover ? (
          <div
            style={{ backgroundColor: "#E9DCC9" }}
            onMouseLeave={handleLeave}
          >
            <div
              style={{
                display: "flex",
                marginBottom: "20px",
                paddingTop: "10px",
              }}
            >
              <p
                style={{
                  paddingRight: "30px",
                  paddingLeft: "20px",
                  fontWeight: "800",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                {categoryName}
              </p>
              <p
                style={{ color: "blue", fontWeight: "500", cursor: "pointer" }}
                onClick={() =>
                  router.push(
                    `/c/${childCategory[0].categoryIdentifier.toLowerCase()}`
                  )
                }
              >
                View All
              </p>
            </div>
            <div style={{ paddingBottom: "20px" }}>
              <ul style={{ display: "flex", listStyle: "none" }}>
                {childArray.map((data: any, i: any) => (
                  <li
                    style={{
                      paddingRight: "30%",
                      paddingLeft: "20px",
                      fontSize: "18px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      router.push(
                        `/c/${childCategory[0].categoryIdentifier.toLowerCase()}/${data.categoryIdentifier.toLowerCase()}`
                      )
                    }
                  >
                    {i === 0 ? (
                      <p style={{ color: "blue" }}>{data.categoryName}</p>
                    ) : (
                      <p>{data.categoryName}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

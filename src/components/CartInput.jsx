import { useState } from "react";

function CartInput({ addNewItem }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <section>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          if (inputValue.trim() !== "") {
            // (trim한)inputValue가 빈 값("")이 아니면
            // 추가
            addNewItem(inputValue);
            setInputValue("");
          }
        }}
      >
        추가
      </button>
    </section>
  );
}
export default CartInput;

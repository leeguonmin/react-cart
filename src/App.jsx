// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import React from "react";
//
//

// import { useState } from "react"; 라는 문장은 React 컴포넌트에서 상태(state)를 관리하기 위해 필수적인 useState라는 Hook을 불러오는 코드
// useState : 컴포넌트의 상태 관리 > 컴포넌트 내부에서 변화하는 데이터를 관리하는 도구
//          : 함수형 컴포넌트의 상태 > 클래스형 컴포넌트의 state와 비슷한 역할을 하지만, 함수형 컴포넌트에서 사용
//          : 재렌더링 트리거 > 상태가 변경될 때마다 컴포넌트가 다시 렌더링되도록 합니다.
// 왜 useState 를 사용해야하는가?
//    동적인 UI 구현: 버튼 클릭, 입력 값 변경 등 사용자의 상호 작용에 따라 UI를 동적으로 변화시킬 수 있습니다.
//    데이터 관리: 컴포넌트 내부에서 필요한 데이터를 관리하고, 이를 바탕으로 UI를 업데이트할 수 있습니다.
//    간결하고 효율적인 코드: 클래스형 컴포넌트에 비해 더 간결하고 직관적인 코드를 작성할 수 있습니다.
import { useState, useEffect } from "react";

import CartHeader from "./components/CartHeader";
import ShopList from "./components/ShopList";
import CartInput from "./components/CartInput";
import BoughtList from "./components/BoughtList";
import CartFooter from "./components/CartFooter";
// import './App.css'

//===========================================================================

function App() {
  const apiUrl = "http://localhost:3000/shoplist";
  // 서버로부터 API 호출해서 쇼핑 목록 받아오기

  // const [itemList, setItemList] = useState([
  //   { id: 1, name: "무", isBought: false },
  //   { id: 2, name: "배추", isBought: false },
  //   { id: 3, name: "쪽파", isBought: true },
  //   { id: 4, name: "고춧가루", isBought: false },
  // ]);

  const [itemList, setItemList] = useState([]);

  // API에서 목록 받아오는 함수
  const fetchItem = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다");
      }
      const data = await response.json();
      console.log(data);
      setItemList(data);
      setIsLoading(false); // 로딩이 끝났음을 알림
    } catch (err) {
      // console.error(err);
      setError(err.message);
      setIsLoading(false); // 로딩이 끝났습니다
    }
  };
  useEffect(() => {
    fetchItem();
  }, []); // -> 컴포넌트가 처음 로딩되었을 때의 이펙트 발생

  // 산 물건 보기 여부를 체크할 수 있는 state 추가
  const [showBoughtItem, setshowBoughtItem] = useState(true);
  // 페이지 로딩 상태 체크 state
  const [isLoading, setIsLoading] = useState(true);
  // 에러 메세지 출력을 위한 state
  const [error, setError] = useState(null);

  // ============================================================================================
  // isBought가 flase 인 것만 필터링 (isBought가 === flase)
  // 1. itemList에서 뽑아올거임 > 필터할겨 > item이 뽑혀올텐데, 그 중 isBought인 것. 그리고 그 중에서도 false 인거여야 해서 ! 사용
  const shopItem = itemList.filter((item) => !item.isBought);

  // (이게 지금 부모함수임?)
  // id 받아와서 isBought를 true <-> false 하는 코드
  const toggleBought = async (id) => {
    /* 이런 로컬 방식 
    // 아이디 값 전달받아서
    const newItemLsit = itemList.map((item) =>
      item.id === id ? { ...item, isBought: !item.isBought } : item
    ); // false 을 true로 바꾸는거래
    setItemList(newItemLsit);
    */

    // 이건 PUT 메서드 사용하는 방식
    // id로 아이템을 찾아서
    // 해당 아이템의 isBought 값을 반전 true <-> false
    const updatedItem = itemList.find((item) => item.id === id);
    updatedItem.isBought = !updatedItem.isBought;
    // 서버에 update 요청 전송

    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });
      if (!response.ok) {
        throw new Error("데이터를 수정하지 못했습니다");
      }
      fetchItem();
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  // =======================================================================================================
  // id 받아와서 item삭제 (해당된 아이디만 빼고! 나머질르 가져가겠다~ 라는 의미로 삭제할거임)
  const delteItem = async (id) => {
    /*   로컬 방식
    const newItemLsit = itemList.filter((item) => item.id !== id);
    setItemList(newItemLsit);
    */

    // DELETE method로 요청하는 방식
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        // 추가 해서 전송
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("아이템을 삭제하지 못했습니다 ");
      }
      //목록 갱신
      fetchItem();
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  //====================================================================
  // isBought == true
  const BoughtItem = itemList.filter((item) => item.isBought);

  // const Bought = itemList.map((item) =>
  //   item.id === id ? )

  // <이건 내가 따로 한건데, 이렇게 따로 만들어줄 필요 없고, true를 false로, false을 ture로 만드는거니까 그냥 toggleBought 써도 되나봅니다 그걸로 수정함
  // const deleteBought = (id) => {
  //   // itemList에서 해당 아이템 찾아서 isBought를 false로 변경
  //   const newItemList = itemList.map((item) =>
  //     // item.id !== id);
  //     item.id === id ? { ...item, isBought: false } : item
  //   );
  //   setItemList(newItemList);
  // };

  // ====================================================================

  if (isLoading) return <div>로딩 중....</div>;
  if (error) return <div>에러: {error}</div>;

  // 새 아이템 추가!
  const addNewItem = async (name) => {
    // 새로운 id 생성 (새로운 목록 추가)
    // -> id의 최댓값에 +1
    const newId =
      itemList.length > 0
        ? Math.max(...itemList.map((item) => item.id)) + 1
        : 1;
    // item의 id를 뽑아 전개(...) 하고 새 배열map 만들고 -> 그 중 max 최대값을 꺼내자 : 아니면(최댓값이 없으면) 1);

    // 객체 생성
    // const newItem = {id: newId, name:name, isBought: false};       => key와 값?이 값으면 짧게 줄여쓸수있음 밑에처럼
    //    : 속성이 key이름과 값 이름이 같을 때 -> 줄여쓸 수있다
    //              (ex) name: name => name
    const newItem = { id: newId, name, isBought: false };

    // itemList에 새 아이쳄 추가,,,,,,,,,,,,,,
    /*    이건 로컬 방식 
    const newItemList = [...itemList, newItem];
    setItemList(newItemList);
    */

    // -> REST 서버에 POST 호출 하는 방식 -> CERATE
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      // 요청 결과 확인
      if (!response.ok) {
        throw new Error("새 아이템을 추가하지 못했습니다");
      }
      // 리스트 갱신
      fetchItem();
    } catch (err) {
      setError(err.message);
    }
  };

  // =======================================================
  return (
    <div>
      <CartHeader />
      {/*<section>: 개별 기능(예: ShopList, BoughtList)을 구획화하고, 각각을 독립적으로 관리*/}
      <hr />
      <main>
        <section>
          <h2>전체 목록</h2>
          {/* map은 안쪽에있는걸 꺼내서, 내부 요소를 변형시켜 꺼내는?
          => map 함수는 배열의 각 요소를 돌면서 새로운 배열을 만들어주는 함수
          => 즉, 기존 배열의 각 요소를 특정 함수로 처리하여 새로운 배열의 요소로 만들어줍니다.*/}
          <ul>
            {itemList.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </section>
        {/* key 속성은 React에서 리스트를 렌더링할 때 각 요소를 고유하게 식별하기 위해 사용하는 속성
         React는 key 속성을 이용하여 어떤 요소가 추가, 삭제, 또는 순서가 변경되었는지 추적하고, 최소한의 DOM 조작으로 효율적으로 화면을 업데이트합니다.
         
         - key 속성이 없거나 중복된 값을 사용하면 React는 어떤 요소가 변경되었는지 정확하게 파악하지 못하고 불필요한 재렌더링을 수행할 수 있습니다. 이는 성능 저하로 이어질 수 있습니다.
         - 리스트의 순서가 변경될 때, React는 key 속성을 기반으로 요소의 위치를 변경합니다.
         - 새로운 요소가 추가되거나 기존 요소가 삭제될 때, React는 key 속성을 기반으로 DOM을 업데이트합니다.*/}

        <hr />

        {/* 2. 위에 isBought가 === flase 로 아이템 뽑은거 여기다 내려줘 */}
        {/*구매버튼 누르면 실행될 toggleBought 만들어서 추가 */}
        <ShopList
          items={shopItem}
          toggleBought={toggleBought}
          delteItem={delteItem}
        />

        <hr />

        <CartInput addNewItem={addNewItem} />

        <hr />

        <input
          type="checkbox"
          id="show-bought-items"
          checked={showBoughtItem}
          onChange={(event) => setshowBoughtItem(event.target.checked)}
        />
        <label>산 물건 보기</label>

        {/* <BoughtList items={BoughtItem} deleteBought={deleteBought} /> */}
        {/* 선택적 렌더링할겨 */}
        {showBoughtItem && (
          <BoughtList items={BoughtItem} toggleBought={toggleBought} />
        )}
        {/* 이렇게 선택적 렌더링해서, 산물건보기 누르면 구매목록이 뜰 수 잇게 넣어줬음  */}

        <hr />
      </main>
      <CartFooter />
      <hr />
      {/* <BoughtList></BoughtList>
    <CartFooter></CartFooter>
    <CartHeader></CartHeader>
    <CartInput></CartInput>
    <ShopList></ShopList> */}
    </div>
  );
}

export default App;

// ====================================================
{
  /* <ul>
            <li>무</li>
            <li>배추</li>
            <li>쪽파</li>
            <li>고춧가루</li>
          </ul> */
}

// 살 물건들이라하면, 장바구니라는 거지? 음
// function ShopList() {
// 3. 받아올 isBought === flase인 item 넣어주기 (function ShopList 입장에선 받아오는거겠지)
function ShopList({ items, toggleBought, delteItem }) {
  console.log("살 물건들:", items);
  return (
    <div>
      <h2>살 물건들</h2>
      {/* 목록태그 만들기 */}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}

            <button onClick={() => toggleBought(item.id)}>구매</button>
            <button onClick={() => delteItem(item.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ShopList;

// 삭제 버튼은 누르면, 아이디를 가져와서, 아이디 에 해당하는 것만 빼고 다시 돌아와서, 삭제? ?? ???

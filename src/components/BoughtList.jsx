// function BoughtList({ items, deleteBought }) {
function BoughtList({ items, toggleBought }) {
  return (
    <div>
      <h2>산 물건들</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}

            <button onClick={() => toggleBought(item.id)}>취소</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default BoughtList;

// 일단 트루인것들만 출력되게 혼자 해보기 > 걍 따라해서 성공하긴 했는데 진짜 혼자는 죽어도 못쓰게 생김

interface TabsProps {
  selectedTab: number;
  setSelectedTab: (state: 1 | 2) => void;
  tabNames: string[];
}
const Tabs = (props: TabsProps) => {
  const { selectedTab, setSelectedTab, tabNames } = props;
  return (
    <div className="grid h-8 w-full grid-cols-2">
      <div
        className="flex flex-col items-center justify-center hover:cursor-pointer"
        onClick={() => {
          setSelectedTab(1);
        }}
      >
        <div className="text-center text-2xl">{tabNames[0]}</div>
        {selectedTab === 1 ? (
          <div
            style={{
              background:
                "radial-gradient(circle at 10% 20%, rgb(255, 12, 253) 0%, rgb(255, 241, 53) 90%)",
            }}
            className="h-1 w-1/2 rounded-full"
          />
        ) : (
          <div className="h-1 w-1/2 rounded-full" />
        )}
      </div>
      <div
        className="flex flex-col items-center justify-center hover:cursor-pointer"
        onClick={() => {
          setSelectedTab(2);
        }}
      >
        <div className="text-center text-2xl">{tabNames[1]}</div>
        {selectedTab === 2 ? (
          <div
            style={{
              background:
                "radial-gradient(circle at 10% 20%, rgb(255, 12, 253) 0%, rgb(255, 241, 53) 90%)",
            }}
            className="h-1 w-1/2 rounded-full"
          />
        ) : (
          <div className="h-1 w-1/2 rounded-full" />
        )}
      </div>
    </div>
  );
};

export default Tabs;

interface ActivityPageProps {
  activityId: string;
}

const ActivityPage = (props: ActivityPageProps) => {
  const { activityId } = props;
  return (
    <main className="flex h-screen w-screen justify-center pt-20">
      <div>Activity {activityId}</div>
    </main>
  );
};

export default ActivityPage;

import { TWorkDetail } from "../pages/Home";

type TProps = {
  workDetail: TWorkDetail[];
};

export default function Details({ workDetail }: TProps) {
  return (
    <div>
      {workDetail.map((x) => (
        <div
          key={x.id}
          style={{
            border: "2px solid blue",
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3>Project: {x.project}</h3>
          <h2>{x.created_by.full_name}</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <p>{x.start_time}</p>
            <p style={{ marginLeft: 5, marginRight: 5 }}>-</p>
            <p>{x.end_time}</p>
          </div>
          <p>Total Hours: {x.hours}</p>
        </div>
      ))}
    </div>
  );
}

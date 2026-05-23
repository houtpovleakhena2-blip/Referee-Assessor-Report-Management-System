import MainLayout from "../components/layout/MainLayout";

export default function DashboardPage(){

  return(

    <MainLayout>

      <div className="grid grid-cols-4 gap-5">

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3>Total Matches</h3>
          <p className="text-3xl font-bold">25</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3>Total Reports</h3>
          <p className="text-3xl font-bold">40</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3>Referees</h3>
          <p className="text-3xl font-bold">18</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3>Average Score</h3>
          <p className="text-3xl font-bold">8.4</p>
        </div>

      </div>

    </MainLayout>
  )
}
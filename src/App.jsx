function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
        <div className="bg-gradient-to-r from-red-600 to-blue-700 p-4 text-white text-center font-bold tracking-widest text-sm">
          UPCOMING MATCH • CHINNASWAMY STADIUM
        </div>

        <div className="p-8 flex flex-col items-center gap-6">
          <div className="flex items-center justify-between w-full">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full mb-2 flex items-center justify-center text-2xl font-black text-red-600 border-4 border-red-50">RCB</div>
              <p className="text-xs font-bold text-slate-400 uppercase">Home</p>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-slate-200">VS</span>
              <span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-bold text-slate-500 mt-2">T20</span>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full mb-2 flex items-center justify-center text-2xl font-black text-blue-600 border-4 border-blue-50">MI</div>
              <p className="text-xs font-bold text-slate-400 uppercase">Away</p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-slate-100"></div>

          <div className="space-y-3 w-full">
            <button className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-95">
              Apply for Player Spot
            </button>
            <button className="w-full border-2 border-slate-200 hover:border-slate-900 text-slate-600 hover:text-slate-900 font-bold py-4 rounded-2xl transition-all">
              Register as Umpire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
"use client";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase/client";

function WaitingRequestpage() {
  const [applydata, setApplydata] = useState(null);

  const addApply = async () => {
    try {
      const { data, error } = await supabase().from("study_apply").select("*");
      if (error) {
        throw error;
      }
      setApplydata(data);
      console.log(data);
      console.log(data[0].id);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    addApply();
  }, []);

  return (
    <>
      <div>
        {applydata ? (
          <ul>
            {applydata.map((apply) => (
              <li key={apply.id}>
                <div>
                  {apply.status && (
                    <>
                      <div>{apply.id}</div>
                      <div>
                        <button>승인됨</button>
                      </div>
                    </>
                  )}
                  {!apply.status && (
                    <>
                      <div>{apply.id}</div>
                      <div>
                        <button>거절</button>
                        <button>수락</button>
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </>
  );
}

export default WaitingRequestpage;

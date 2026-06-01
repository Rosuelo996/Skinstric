import Link from "next/link";

const SelectPage = () => {
  return (
    <main className="select">
      <section className="select-page">
        <div className="page-label">
          <h1 className="page-label__title">A.I ANALYSIS</h1>
          <p className="page-label__para">
            A.I HAS ESTIMATED THE FOLLOWING
            <br />
            FIX ESTIMATED INFORMATION IF NEEDED
          </p>
        </div>

        <div className="layout-diamond select-diamond">
          <img
            src="/icons/diamond-large.svg"
            alt=""
            className="layout-diamond__svg layout-diamond__svg--large"
          />
          <img
            src="/icons/diamond-large.svg"
            alt=""
            className="layout-diamond__svg layout-diamond__svg--medium"
          />
          <img
            src="/icons/diamond-large.svg"
            alt=""
            className="layout-diamond__svg layout-diamond__svg--small"
          />

          <div className="select-diamond__content">
            <button className="select-diamond__card">
              <span className="select-diamond__label">DEMOGRAPHICS</span>
            </button>

            <button className="select-diamond__card" disabled>
              <span className="select-diamond__label">COSMETIC
              <br />
              CONCERNS
              </span>
            </button>

            <button className="select-diamond__card" disabled>
              <span className="select-diamond__label">SKIN TYPE
              <br />
              DETAILS
              </span>
            </button>

            <button className="select-diamond__card" disabled>
              <span className="select-diamond__label">WEATHER</span>
            </button>
          </div>
        </div>

        <Link href={"/summary"}>
          <button className="back-button action-button">
            <img src="/icons/diamond-btn-left.svg" alt="" />
            <span>BACK</span>
          </button>
        </Link>

        <Link href={"/result"}>
            <button className="proceed-button action-button">
              <span>GET SUMMARY</span>
              <img src="/icons/diamond-btn-right.svg" alt="" />
            </button>
          </Link>

      </section>
    </main>
  );
};

export default SelectPage;

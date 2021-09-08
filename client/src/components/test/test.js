
import Options from '../dashboard/options/Options'

function Test() {
    const wallet = {
        _id: "6132d262810fb361beabd28d",
        userId: "612d9718b5fcf5b1e5a95359",
        walletId: 1,
        balance: 2000,
        trades: [
            {
                day: 2,
                month: 5,
                year: 2022,
                spendType: "education",
                amount: 202,
                decription: "das",
                _id: "6132d262810fb361beabd28e"
            },
            {
                day: 4,
                month: 5,
                year: 2022,
                spendType: "other",
                amount: 250,
                decription: "bla sdsdw j j jbla",
                _id: "6132d262810fb361beabd28f"
            },
            {
                day: 5,
                month: 5,
                year: 2022,
                spendType: "other",
                amount: 10,
                decription: "ggwp",
                _id: "6132d262810fb361beabd290"
            },
            {
                day: 4,
                month: 8,
                year: 2021,
                spendType: "update balance",
                amount: 700,
                decription: "update wallet balance",
                _id: "6133371b3104595cfb240d61"
            },
            {
                day: 4,
                month: 8,
                year: 2021,
                reciveType: "update balance",
                amount: 500,
                decription: "update wallet balance",
                _id: "613339025a49998029bcdd20"
            },
            {
                day: 3,
                month: 3,
                year: 2023,
                reciveType: "other",
                amount: 100,
                decription: "spending 100 dollar this month 123 abc xyz",
                _id: "61342df615e21b941815c569"
            }
        ],
        "__v": 5,
        "walletName": "cong viec"
    }

    return (<>
        <Options details={wallet}/>
    </>)
}

export default Test
import { promises as fs } from "fs"
import path from "path"

export async function POST(req) {
    const data = await req.json()

    const filePath = path.join(process.cwd(), "data", "orders.json")

    // Read existing orders
    let orders = []
    try {
        const fileData = await fs.readFile(filePath, "utf8")
        orders = JSON.parse(fileData)
    } catch (err) {
        orders = []
    }

    // Add new order
    const orderId = Date.now()  // simple unique id
    const newOrder = { ...data, _id: orderId }
    orders.push(newOrder)

    // Save back to JSON
    await fs.writeFile(filePath, JSON.stringify(orders, null, 2))

    return new Response(JSON.stringify({ success: true, orderId }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    })
}

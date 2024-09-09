import { Badge, Container } from "@radix-ui/themes";
import {  Card, CardContent, CardDescription, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "ui";
import getAllOnRampTxn from "app/lib/action/getAllOnRampTxn";

export default async function() {
    const transactions = await getAllOnRampTxn();

    return(
        <Container className="mr-10 mt-6">
            <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                 All transactions done by you.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead >
                      Status
                    </TableHead>
                    <TableHead >
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                {transactions.map((t)=>(
                <TableBody key={t.time.toLocaleDateString()}>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium text-md">{t.name}</div>
                      <div className=" text-sm text-muted-foreground md:inline">
                        {t.email} 
                      </div>
                    </TableCell>
                    <TableCell >
                      <Badge className="text-xs rounded-full" variant="outline" color={["Success", "Sent", "Received"].includes(t.status) ? "green" : "red"} >
                        {t.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-md">
                      {t.time.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right text-lg">₹{t.amount/100}</TableCell>
                  </TableRow>
                  
                </TableBody>))}
                
              </Table>
            </CardContent>
          </Card>
        </Container>
    )
        
}
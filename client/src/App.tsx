import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Thermometer from "@/pages/Thermometer";
import Question from "@/pages/Question";
import Memories from "@/pages/Memories";
import Surprise from "@/pages/Surprise";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/thermometer" component={Thermometer} />
      <Route path="/question" component={Question} />
      <Route path="/memories" component={Memories} />
      <Route path="/surprise" component={Surprise} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "./calendar";
import { IEvent } from "@/types";
import { Button } from "@/components/ui/button";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

type Props = {};

// TODO - create a separate hook for events

function CalendarWidget({}: Props) {
    const supabase = useSupabaseClient();
    const session = useSession();

    const [selectedDates, onDatesChange] = useState<Date[]>([]);

    const [events, setEvents] = useState<IEvent[]>([]);

    const handleGoogleSignIn = async () => {
        const environment = process.env.NODE_ENV;

        if (environment === "development") {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    scopes: "https://www.googleapis.com/auth/calendar",
                },
            });

            if (error) {
                console.log(error);
                return;
            }
        } else {
            // handle login with google in production
            // for example, trigger an event to be picked up by the content script (which doesn't exist yet)
            // I've tried this, but i can't get it to work. PLS HEEELP
        }
    };

    useEffect(() => {
        const getEvents = async () => {
            const res = await fetch(
                "https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=2500&timeMin=2021-01-01T00%3A00%3A00%2B00%3A00",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${session?.provider_token}`,
                    },
                }
            );

            const data = await res.json();

            const filteredEvents = data.items
                ? data.items.filter(
                      (event: IEvent) =>
                          new Date(event.start.dateTime).getFullYear() ===
                          new Date().getFullYear()
                  )
                : [];

            setEvents(filteredEvents);
        };

        getEvents();
    }, [session]);

    return (
        <Card
            id="calendar-widget"
            className="grid grid-cols-1 col-span-2 grid-rows-1 row-span-4 pt-2.5 2xl:pt-5 2xl:row-span-3 place-items-center rounded-xl"
        >
            <CardContent className="w-full h-full">
                <Calendar
                    selectedDates={selectedDates}
                    onDatesChange={onDatesChange}
                    events={events}
                />
                {/* later down the line, remove the check for NODE_ENV caues the production auth will work....I hope 🫠 */}
                {!session && process.env.NODE_ENV === "development" && (
                    <Button
                        variant="default"
                        className="mt-4"
                        onClick={async () => await handleGoogleSignIn()}
                    >
                        Sign in with Google
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

export default CalendarWidget;

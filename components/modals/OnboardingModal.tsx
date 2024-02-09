"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEventHandler, useCallback, useRef } from "react";
import { useUserPreferences } from "@/stores/user-preferences";
import { IUserData } from "@/types";

export function OnboardingModal() {
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const imageUrlRef = useRef<HTMLInputElement>(null);

    const userData = useUserPreferences((state) => state.userData);
    const setUserPreferencesAction = useUserPreferences(
        (state) => state.setUserData,
    );

    const setUserPreferences: FormEventHandler<HTMLFormElement> = useCallback(
        (e) => {
            e.preventDefault();
            const data: IUserData = {
                firstName: firstNameRef.current!.value,
                lastName: lastNameRef.current!.value,
                imageUrl: imageUrlRef.current!.value,
            };
            setUserPreferencesAction(data);
        },
        [setUserPreferencesAction],
    );

    return (
        <Dialog open={userData === undefined}>
            <DialogContent>
                <form onSubmit={setUserPreferences} className="mx-2">
                    <div className="flex justify-between mb-2">
                        <Label htmlFor="firstName" className="block">
                            First name
                            <Input
                                ref={firstNameRef}
                                id="firstName"
                                defaultValue={userData?.firstName}
                                type="text"
                                name="firstName"
                            />
                        </Label>
                        <Label htmlFor="lastName" className="block">
                            Last name
                            <Input
                                ref={lastNameRef}
                                id="lastName"
                                defaultValue={userData?.lastName}
                                type="text"
                                name="lastName"
                            />
                        </Label>
                    </div>
                    <Label htmlFor="imageUrl" className="block">
                        Image url
                        <Input
                            ref={imageUrlRef}
                            type="text"
                            defaultValue={userData?.imageUrl}
                            id="imageUrl"
                            name="imageUrl"
                        />
                    </Label>
                    <Button type="submit" className="mt-2">
                        Create user
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

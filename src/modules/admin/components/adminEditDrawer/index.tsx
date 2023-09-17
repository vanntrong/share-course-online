/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Drawer,
  FileInput,
  Flex,
  Space,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Column } from "../adminTable";

interface AdminEditDrawerProps<T> {
  opened: boolean;
  close: () => void;
  title?: string;
  schema: z.AnyZodObject;
  columns: Array<Column<T>>;
  data?: T | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  resetOnClose?: boolean;
}

const getInput = (type: string) => {
  switch (type) {
    case "textarea":
      return Textarea;
    case "file":
      return FileInput;
    default:
      return TextInput;
  }
};

const AdminEditDrawer = <T,>({
  opened,
  close,
  title = "Edit",
  columns,
  data,
  schema,
  onSubmit,
  resetOnClose,
}: AdminEditDrawerProps<T>) => {
  type FormValues = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: data as FormValues,
  });

  useEffect(() => {
    if (opened && data) {
      Object.keys(data).forEach((key) => {
        setValue(key as string, (data as any)[key]);
      });
    }
  }, [opened, data, setValue]);

  return (
    <Drawer
      opened={opened}
      onClose={() => {
        if (resetOnClose) {
          reset();
        }
        close();
      }}
      title={title}
      position="right"
    >
      <Flex direction={"column"} gap={"md"}>
        {columns.map(({ type = "input", ...col }) => {
          const Input = getInput(type);

          return (
            <div key={col.key}>
              {col.renderInEdit ? (
                col.renderInEdit({
                  ...col.inputProps,
                  disabled: col.disableInEdit,
                })
              ) : (
                <>
                  {type === "file" ? (
                    <Controller
                      name={col.dataIndex}
                      control={control}
                      render={({ field }) => (
                        <FileInput
                          value={field.value}
                          onChange={(file) => field.onChange(file)}
                          {...(col.inputProps as any)}
                          disabled={col.disableInEdit}
                          error={errors[col.dataIndex]?.message as string}
                        />
                      )}
                    />
                  ) : (
                    <Input
                      label={col.title}
                      {...(col.inputProps as any)}
                      {...register(col.dataIndex)}
                      disabled={col.disableInEdit}
                      error={errors[col.dataIndex]?.message as string}
                    />
                  )}
                </>
              )}
            </div>
          );
        })}

        <Space h={10} />
        <Flex justify="flex-end" gap={"md"}>
          <Space h={10} />
          <Button color="red" variant="light" onClick={close}>
            Cancel
          </Button>
          <Button
            color="blue"
            variant="light"
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Drawer>
  );
};

export default AdminEditDrawer;

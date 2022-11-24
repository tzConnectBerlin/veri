import {
  Box,
  Stack,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Radio,
  RadioGroup,
  Heading,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { VeriContext } from '../../../contexts/veri';

export interface EventDetailFormProps {
  title?: string;
}
export const EventDetailForm: React.FC<EventDetailFormProps> = ({ title }) => {
  const value = useContext(VeriContext);
  const BoxBg = useColorModeValue('white', 'gray.700');
  return (
    <Box rounded={'lg'} bg={BoxBg} boxShadow={'lg'} p={8}>
      <Heading fontSize={'xl'} mb={10}>
        {title}
      </Heading>
      <Stack spacing={10}>
        <FormControl
          isRequired
          isInvalid={
            value.formik.touched.eventName && !!value.formik.errors.eventName
          }
        >
          <FormLabel>Event Name</FormLabel>
          <Input
            type="text"
            name="eventName"
            value={value.formik.values.eventName}
            onChange={value.formik.handleChange}
            onBlur={value.formik.handleBlur}
          />
          <FormErrorMessage>{value.formik.errors.eventName}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={
            value.formik.touched.organizer && !!value.formik.errors.organizer
          }
        >
          <FormLabel>Organizer</FormLabel>
          <Input
            type="text"
            name="organizer"
            value={value.formik.values.organizer}
            onChange={value.formik.handleChange}
            onBlur={value.formik.handleBlur}
          />
          <FormErrorMessage>{value.formik.errors.organizer}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={
            value.formik.touched.organizerEmail &&
            !!value.formik.errors.organizerEmail
          }
        >
          <FormLabel>Organizer Email</FormLabel>
          <Input
            type="organizerEmail"
            name="organizerEmail"
            value={value.formik.values.organizerEmail}
            onChange={value.formik.handleChange}
            onBlur={value.formik.handleBlur}
          />
          <FormErrorMessage>
            {value.formik.errors.organizerEmail}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Event Duration</FormLabel>
          <RadioGroup
            name="eventDuration"
            value={value.formik.values.eventDuration}
          >
            <Stack>
              <Radio value="Single" onChange={value.formik.handleChange}>
                Single Day
              </Radio>
              <Radio value="Multiday" onChange={value.formik.handleChange}>
                Multi Days
              </Radio>
            </Stack>
          </RadioGroup>
          <FormErrorMessage>
            {value.formik.errors.eventDuration}
          </FormErrorMessage>
        </FormControl>
        <Stack gap={8} direction="row">
          <FormControl
            isRequired
            isInvalid={
              value.formik.touched.eventStartDate &&
              !!value.formik.errors.eventStartDate
            }
          >
            <FormLabel>
              {value.formik.values.eventDuration === 'Multiday' && 'Start '}Date
            </FormLabel>
            <Input
              type="datetime-local"
              name="eventStartDate"
              value={value.formik.values.eventStartDate}
              onChange={value.formik.handleChange}
              onBlur={value.formik.handleBlur}
            />
            <FormErrorMessage>
              {value.formik.errors.eventStartDate}
            </FormErrorMessage>
          </FormControl>
          {value.formik.values.eventDuration === 'Multiday' && (
            <FormControl
              isRequired
              isInvalid={
                value.formik.touched.eventEndDate &&
                !!value.formik.errors.eventEndDate
              }
            >
              <FormLabel>End Date</FormLabel>

              <Input
                type="datetime-local"
                name="eventEndDate"
                value={value.formik.values.eventEndDate}
                onChange={value.formik.handleChange}
                onBlur={value.formik.handleBlur}
              />
              <FormErrorMessage>
                {value.formik.errors.eventEndDate}
              </FormErrorMessage>
            </FormControl>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
